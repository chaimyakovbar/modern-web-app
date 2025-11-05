using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using StackExchange.Redis;
using ModernWebApp.Backend.Services;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// ===========================================
// REDIS CONFIGURATION - Read from appsettings.json
// ===========================================
var redisConnectionString = configuration["Redis:ConnectionString"] ?? "localhost:6379";
var redisPassword = configuration["Redis:Password"];

var redisOptions = new ConfigurationOptions
{
    EndPoints = { redisConnectionString },
    AbortOnConnectFail = false,
    ConnectRetry = 3,
    ConnectTimeout = 5000,
    ReconnectRetryPolicy = new ExponentialRetry(100, 1000)
};

if (!string.IsNullOrEmpty(redisPassword))
{
    redisOptions.Password = redisPassword;
}

// Add Redis connection
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var connection = ConnectionMultiplexer.Connect(redisOptions);
    connection.ConnectionFailed += (sender, e) =>
    {
        Console.WriteLine($"❌ Redis connection failed: {e.Exception?.Message}");
    };
    connection.ConnectionRestored += (sender, e) =>
    {
        Console.WriteLine($"✅ Redis connection restored");
    };
    return connection;
});

// Register Redis Service
builder.Services.AddScoped<RedisService>();

// ===========================================
// MVC Controllers
// ===========================================
builder.Services.AddControllers();

// ===========================================
// CORS CONFIGURATION - Read from appsettings.json
// ===========================================
var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() 
    ?? new[] { "http://localhost:5173", "http://localhost:5174", "http://localhost:3000" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ===========================================
// CONFIGURATION VALUES - Read from appsettings.json
// ===========================================
var websocketEndpoint = configuration["WebSocket:Endpoint"] ?? "/ws/cicd";
var statusUpdateInterval = configuration.GetValue<int>("CICD:StatusUpdateInterval", 5000);
var dataRetentionHours = configuration.GetValue<int>("CICD:DataRetentionHours", 24);

// Build the app
var app = builder.Build();

// ===========================================
// MIDDLEWARE CONFIGURATION
// ===========================================
app.UseCors("AllowFrontend");
app.UseWebSockets();
app.MapControllers();

// ===========================================
// REDIS HEALTH CHECK
// ===========================================
var redis = app.Services.GetRequiredService<IConnectionMultiplexer>();
try
{
    if (redis.IsConnected)
    {
        Console.WriteLine("✅ Redis connected successfully!");
        Console.WriteLine($"   Connection: {redisConnectionString}");
        Console.WriteLine($"   Database: {configuration.GetValue<int>("Redis:Database", 0)}");
        Console.WriteLine($"   Data Retention: {dataRetentionHours} hours (TTL)");
    }
    else
    {
        Console.WriteLine("⚠️ Redis connection not established");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Redis connection error: {ex.Message}");
}

// ===========================================
// WEBSOCKET ENDPOINT - Uses configuration from appsettings.json
// ===========================================
app.Map(websocketEndpoint, async context =>
{
    if (!context.WebSockets.IsWebSocketRequest)
    {
        context.Response.StatusCode = 400;
        await context.Response.WriteAsync("WebSocket connection expected");
        return;
    }

    var webSocket = await context.WebSockets.AcceptWebSocketAsync();
    Console.WriteLine("✅ WS client connected");

    var productNames = new[]
    {
        "Web Application", "Mobile App", "API Service", "Database", "Microservice A", "Microservice B",
        "Frontend Dashboard", "Backend API", "Authentication Service", "Payment Gateway", 
        "Notification Service", "Analytics Engine"
    };
    var statuses = new[] { "pending", "running", "success", "failed", "cancelled" };
    var rnd = new Random();
    var cts = new CancellationTokenSource();

    // Send loop - שולח סטטוסים כל 5 שניות
    var sendTask = Task.Run(async () =>
    {
        try
        {
            await Task.Delay(1000, cts.Token);
            while (webSocket.State == WebSocketState.Open && !cts.Token.IsCancellationRequested)
            {
                var update = new
                {
                    type = "statusUpdate",
                    statuses = productNames.Select(n => new 
                    { 
                        name = n, 
                        status = statuses[rnd.Next(statuses.Length)] 
                    }).ToArray()
                };

                var json = JsonSerializer.Serialize(update);
                var bytes = Encoding.UTF8.GetBytes(json);
                await webSocket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
                Console.WriteLine($"📤 Sent statusUpdate: {DateTime.Now:HH:mm:ss}");
                await Task.Delay(statusUpdateInterval, cts.Token);
            }
        }
        catch (OperationCanceledException) { }
        catch (Exception ex) { Console.WriteLine($"❌ Send error: {ex.Message}"); }
    });

    // Receive loop - מקבל הודעות מהפרונט
    var receiveTask = Task.Run(async () =>
    {
        try
        {
            var buffer = new byte[1024 * 4];
            while (webSocket.State == WebSocketState.Open && !cts.Token.IsCancellationRequested)
            {
                try
                {
                    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cts.Token);
                    
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        Console.WriteLine("👋 Client closed connection");
                        cts.Cancel();
                        break;
                    }

                    if (result.MessageType == WebSocketMessageType.Text && result.EndOfMessage)
                    {
                        var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        Console.WriteLine("📥 === Received from Frontend ===");
                        Console.WriteLine(message);
                        Console.WriteLine("=================================");
                    }
                }
                catch (OperationCanceledException)
                {
                    // זה תקין - החיבור נסגר או בוטל
                    break;
                }
                catch (WebSocketException ex) when (ex.WebSocketErrorCode == WebSocketError.ConnectionClosedPrematurely)
                {
                    Console.WriteLine("👋 Client disconnected");
                    break;
                }
                catch (WebSocketException ex)
                {
                    Console.WriteLine($"❌ WebSocket error: {ex.Message}");
                    break;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Receive error: {ex.Message}");
                    // תן לשרת להמשיך - לא לסגור מיד
                    if (webSocket.State != WebSocketState.Open)
                    {
                        break;
                    }
                }
            }
        }
        catch (OperationCanceledException) { }
        catch (Exception ex) { Console.WriteLine($"❌ Receive loop error: {ex.Message}"); }
        finally { cts.Cancel(); }
    });

    await Task.WhenAny(sendTask, receiveTask);
    cts.Cancel();
    
    if (webSocket.State == WebSocketState.Open)
    {
        try { await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server closing", CancellationToken.None); }
        catch { }
    }
    
    Console.WriteLine("✅ Connection closed - Server still running, waiting for new connections...");
});

// ===========================================
// API ENDPOINTS
// ===========================================
app.MapGet("/", () => new 
{ 
    message = "Server is running!",
    websocketEndpoint = websocketEndpoint,
    redis = redis.IsConnected ? "connected" : "disconnected",
    dataRetentionHours = dataRetentionHours
});

app.MapGet("/health", () => new 
{ 
    status = "healthy", 
    timestamp = DateTime.UtcNow,
    redis = redis.IsConnected,
    redisEndpoint = redisConnectionString
});

// ===========================================
// STARTUP LOGS
// ===========================================
Console.WriteLine("🚀 Server started and ready for connections!");
Console.WriteLine("📡 WebSocket endpoint: " + websocketEndpoint);
Console.WriteLine($"⚙️  Configuration loaded from appsettings.json");
Console.WriteLine($"   - Status Update Interval: {statusUpdateInterval}ms");
Console.WriteLine($"   - Data Retention: {dataRetentionHours} hours");
Console.WriteLine($"   - Allowed Origins: {string.Join(", ", allowedOrigins)}");
Console.WriteLine("💡 Server will keep running even when clients disconnect");

app.Run();
