using StackExchange.Redis;
using System.Text.Json;

namespace ModernWebApp.Backend.Services;

/// <summary>
/// Redis service for storing CI/CD tracking data with automatic expiration (24 hours)
/// </summary>
public class RedisService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _database;
    private readonly ILogger<RedisService> _logger;
    private readonly int _defaultExpirationHours;

    public RedisService(IConnectionMultiplexer redis, IConfiguration configuration, ILogger<RedisService> logger)
    {
        _redis = redis;
        _database = redis.GetDatabase();
        _logger = logger;
        _defaultExpirationHours = configuration.GetValue<int>("Redis:DefaultExpirationHours", 24);
    }

    /// <summary>
    /// Save a run with automatic 24-hour expiration
    /// </summary>
    public async Task<bool> SaveRunAsync(string runId, object runData)
    {
        try
        {
            var key = $"cicd:run:{runId}";
            var json = JsonSerializer.Serialize(runData);
            var expiration = TimeSpan.FromHours(_defaultExpirationHours);
            
            await _database.StringSetAsync(key, json, expiration);
            _logger.LogInformation($"✅ Saved run {runId} to Redis (expires in {_defaultExpirationHours} hours)");
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"❌ Error saving run {runId} to Redis");
            return false;
        }
    }

    /// <summary>
    /// Get a run by ID
    /// </summary>
    public async Task<T?> GetRunAsync<T>(string runId) where T : class
    {
        try
        {
            var key = $"cicd:run:{runId}";
            var json = await _database.StringGetAsync(key);
            
            if (json.IsNullOrEmpty)
            {
                _logger.LogWarning($"⚠️ Run {runId} not found in Redis");
                return null;
            }

            return JsonSerializer.Deserialize<T>(json!);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"❌ Error getting run {runId} from Redis");
            return null;
        }
    }

    /// <summary>
    /// Save a product status with automatic expiration
    /// </summary>
    public async Task<bool> SaveProductStatusAsync(string productId, object statusData)
    {
        try
        {
            var key = $"cicd:product:{productId}";
            var json = JsonSerializer.Serialize(statusData);
            var expiration = TimeSpan.FromHours(_defaultExpirationHours);
            
            await _database.StringSetAsync(key, json, expiration);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"❌ Error saving product status {productId} to Redis");
            return false;
        }
    }

    /// <summary>
    /// Get product status by ID
    /// </summary>
    public async Task<T?> GetProductStatusAsync<T>(string productId) where T : class
    {
        try
        {
            var key = $"cicd:product:{productId}";
            var json = await _database.StringGetAsync(key);
            
            if (json.IsNullOrEmpty)
                return null;

            return JsonSerializer.Deserialize<T>(json!);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"❌ Error getting product status {productId} from Redis");
            return null;
        }
    }

    /// <summary>
    /// Get all runs (keys matching pattern)
    /// </summary>
    public async Task<List<T>> GetAllRunsAsync<T>() where T : class
    {
        try
        {
            var runs = new List<T>();
            var server = _redis.GetServer(_redis.GetEndPoints().First());
            var keys = server.Keys(pattern: "cicd:run:*");

            foreach (var key in keys)
            {
                var json = await _database.StringGetAsync(key);
                if (!json.IsNullOrEmpty)
                {
                    var run = JsonSerializer.Deserialize<T>(json!);
                    if (run != null)
                        runs.Add(run);
                }
            }

            return runs;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "❌ Error getting all runs from Redis");
            return new List<T>();
        }
    }

    /// <summary>
    /// Delete a run
    /// </summary>
    public async Task<bool> DeleteRunAsync(string runId)
    {
        try
        {
            var key = $"cicd:run:{runId}";
            return await _database.KeyDeleteAsync(key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"❌ Error deleting run {runId} from Redis");
            return false;
        }
    }

    /// <summary>
    /// Check if Redis is connected
    /// </summary>
    public bool IsConnected()
    {
        return _redis.IsConnected;
    }

    /// <summary>
    /// Get remaining TTL (Time To Live) for a key
    /// </summary>
    public async Task<TimeSpan?> GetTTLAsync(string runId)
    {
        try
        {
            var key = $"cicd:run:{runId}";
            return await _database.KeyTimeToLiveAsync(key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"❌ Error getting TTL for run {runId}");
            return null;
        }
    }
}

