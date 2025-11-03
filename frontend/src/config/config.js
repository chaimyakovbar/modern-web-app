/**
 * Application Configuration
 * All connection strings and settings in one place
 * Easy to change for different environments
 */

const config = {
    // Backend API Configuration
    backend: {
        // WebSocket endpoint for CI/CD real-time updates
        websocketUrl: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:5261/ws/cicd',

        // REST API base URL (if needed in future)
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5261',

        // WebSocket reconnection settings
        websocket: {
            reconnectAttempts: 5,
            reconnectInterval: 3000, // milliseconds
            connectTimeout: 10000
        }
    },

    // Application Settings
    app: {
        name: 'Modern Web App',
        version: '1.0.0',
        environment: import.meta.env.MODE || 'development'
    },

    // CI/CD Configuration
    cicd: {
        statusUpdateInterval: 5000, // milliseconds
        maxRetries: 3
    }
};

export default config;

