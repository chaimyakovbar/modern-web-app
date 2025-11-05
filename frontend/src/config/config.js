/**
 * Application Configuration
 * All connection strings and settings in one place
 * Easy to change for different environments
 */

const config = {
    // Backend Connection
    backend: {
        // Base URL for all REST requests
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5261'
    },

    // Centralized API: endpoints + HTTP helpers
    api: {
        baseUrl: '', // assigned below from backend.apiBaseUrl

        // Endpoints map: single source of truth
        endpoints: {
            // Health & Status — checks that the server is reachable
            health: '/health',

            // CI/CD — manage runs and actions
            cicd: {
                runs: '/api/cicd/runs',            // list or create runs
                singleRun: '/api/cicd/single-run',  // create a run for a single product
                status: '/api/cicd/status',         // post pinplaneId:projectId map to get statuses
                run: (id) => `/api/cicd/runs/${id}`, // get/delete single run
                rerun: (id) => `/api/cicd/runs/${id}/rerun`, // trigger rerun for run
            },

            // Home — dashboard data
            home: {
                dashboard: '/api/home',        // fetch home dashboard
                stats: '/api/home/stats'       // fetch home stats
            },

            // Terraces — domain entities
            terraces: {
                list: '/api/terraces',                     // list all terraces
                terrace: (id) => `/api/terraces/${id}`     // get terrace by id
            }
        },

        // Lightweight HTTP helpers built on fetch
        http: {
            get: async (endpoint, options = {}) => {
                const url = typeof endpoint === 'string' ? `${config.api.baseUrl}${endpoint}` : endpoint;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
                    ...options
                });
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text || `HTTP GET ${url} failed with ${response.status}`);
                }
                return response.json();
            },
            post: async (endpoint, data, options = {}) => {
                const url = typeof endpoint === 'string' ? `${config.api.baseUrl}${endpoint}` : endpoint;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
                    body: JSON.stringify(data),
                    ...options
                });
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text || `HTTP POST ${url} failed with ${response.status}`);
                }
                return response.json();
            },
            put: async (endpoint, data, options = {}) => {
                const url = typeof endpoint === 'string' ? `${config.api.baseUrl}${endpoint}` : endpoint;
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
                    body: JSON.stringify(data),
                    ...options
                });
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text || `HTTP PUT ${url} failed with ${response.status}`);
                }
                return response.json();
            },
            delete: async (endpoint, options = {}) => {
                const url = typeof endpoint === 'string' ? `${config.api.baseUrl}${endpoint}` : endpoint;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
                    ...options
                });
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text || `HTTP DELETE ${url} failed with ${response.status}`);
                }
                return response.json();
            }
        }
    },

    // Application Settings
    app: {
        name: 'Modern Web App',
        version: '1.0.0',
        environment: import.meta.env.MODE || 'development'
    },

    // CI/CD Configuration (frontend-only behavior)
    cicd: {
        statusUpdateInterval: 5000,
        maxRetries: 3
    }
};

// Initialize api.baseUrl from backend
config.api.baseUrl = config.backend.apiBaseUrl;

export default config;

