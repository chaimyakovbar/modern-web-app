# Redis Configuration Guide

## 📋 Overview

המערכת משתמשת ב-Redis לאחסון נתוני CI/CD עם TTL (Time To Live) של 24 שעות - הנתונים נמחקים אוטומטית אחרי 24 שעות.

## 🔧 Configuration

כל החיבורים וההגדרות נמצאים ב-`appsettings.json` ו-`appsettings.Development.json`

### Configuration Files:

- **`appsettings.json`** - קונפיגורציה ל-Production
- **`appsettings.Development.json`** - קונפיגורציה ל-Development (override של appsettings.json)

## 📝 Connection Strings

### Redis Configuration:

```json
{
  "Redis": {
    "ConnectionString": "localhost:6379",
    "Password": "",
    "Database": 0,
    "DefaultExpirationHours": 24,
    "EnableCompression": true
  }
}
```

### How to Change Redis Connection:

1. פתח את `appsettings.json` או `appsettings.Development.json`
2. עדכן את `Redis:ConnectionString`
3. אם יש Password, עדכן את `Redis:Password`
4. השרת יטען את השינויים אוטומטית

## 🔌 Connection Examples:

### Local Redis:

```json
"Redis": {
  "ConnectionString": "localhost:6379"
}
```

### Redis with Password:

```json
"Redis": {
  "ConnectionString": "localhost:6379",
  "Password": "your-password-here"
}
```

### Remote Redis:

```json
"Redis": {
  "ConnectionString": "redis.example.com:6379",
  "Password": "your-password-here"
}
```

### Redis Cloud (Redis Labs):

```json
"Redis": {
  "ConnectionString": "your-redis-host.redislabs.com:12345",
  "Password": "your-redis-password"
}
```

## ⚙️ Other Configuration Options:

### CORS Origins:

```json
"Cors": {
  "AllowedOrigins": [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
  ]
}
```

### WebSocket Configuration:

```json
"WebSocket": {
  "Endpoint": "/ws/cicd",
  "BufferSize": 4096,
  "KeepAliveInterval": 30000,
  "ReceiveBufferSize": 4096
}
```

### CI/CD Configuration:

```json
"CICD": {
  "StatusUpdateInterval": 5000,
  "DataRetentionHours": 24
}
```

## 🚀 Installation

### Install Redis Locally:

#### Windows:

```bash
# Using Chocolatey
choco install redis-64

# Or download from: https://github.com/microsoftarchive/redis/releases
```

#### macOS:

```bash
brew install redis
brew services start redis
```

#### Linux (Ubuntu/Debian):

```bash
sudo apt-get update
sudo apt-get install redis-server
sudo systemctl start redis
```

## 📊 Usage in Code

### Inject RedisService:

```csharp
public class MyController : ControllerBase
{
    private readonly RedisService _redis;

    public MyController(RedisService redis)
    {
        _redis = redis;
    }

    public async Task<IActionResult> SaveRun(string runId, object runData)
    {
        await _redis.SaveRunAsync(runId, runData);
        return Ok();
    }
}
```

### Save Data with 24-hour TTL:

```csharp
await _redis.SaveRunAsync("run-123", runData);
// Data will automatically expire after 24 hours
```

### Get Data:

```csharp
var run = await _redis.GetRunAsync<RunData>("run-123");
```

## 🔍 Monitoring

### Check Redis Connection:

```bash
# Health endpoint
curl http://localhost:5261/health

# Should show: "redis": true if connected
```

### Check Redis Directly:

```bash
redis-cli
> PING
# Should return: PONG
```

## 📚 Redis Keys Structure:

- `cicd:run:{runId}` - Run data (expires in 24 hours)
- `cicd:product:{productId}` - Product status (expires in 24 hours)

## ⚠️ Important Notes:

1. **Data is temporary** - All data expires after 24 hours
2. **No persistence by default** - If Redis restarts, data is lost (unless persistence is configured)
3. **Memory usage** - Monitor Redis memory usage
4. **Connection pooling** - Redis connection is shared and pooled

## 🔄 Changing Configuration

כל השינויים בקונפיגורציה מתבצעים ב-`appsettings.json` - אין צורך לשנות קוד!

Simply edit the configuration files and restart the server.
