/**
 * API Service
 * All backend API calls in one organized place
 * Easy to change backend URL and manage all API requests
 */

import config from '../config/config';

// ===========================================
// BASE CONFIGURATION
// ===========================================
const API_BASE_URL = config.backend.apiBaseUrl || 'http://localhost:5261';

// ===========================================
// API ENDPOINTS
// ===========================================
const ENDPOINTS = {
    // Health & Status
    health: '/health',

    // CI/CD Endpoints
    cicd: {
        runs: '/api/cicd/runs',
        run: (id) => `/api/cicd/runs/${id}`,
        rerun: (id) => `/api/cicd/runs/${id}/rerun`,
        delete: (id) => `/api/cicd/runs/${id}`,
    },

    // Home Endpoints
    home: {
        dashboard: '/api/home',
        stats: '/api/home/stats',
    },

    // Terraces Endpoints
    terraces: {
        list: '/api/terraces',
        terrace: (id) => `/api/terraces/${id}`,
    },
};

// ===========================================
// HELPER FUNCTIONS
// ===========================================

/**
 * Build full URL from endpoint
 */
const buildUrl = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
};

/**
 * Handle fetch response
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

/**
 * Generic GET request
 */
const get = async (endpoint, options = {}) => {
    try {
        const url = typeof endpoint === 'string' ? buildUrl(endpoint) : endpoint;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`GET ${endpoint} error:`, error);
        throw error;
    }
};

/**
 * Generic POST request
 */
const post = async (endpoint, data, options = {}) => {
    try {
        const url = typeof endpoint === 'string' ? buildUrl(endpoint) : endpoint;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
            ...options,
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`POST ${endpoint} error:`, error);
        throw error;
    }
};

/**
 * Generic PUT request
 */
const put = async (endpoint, data, options = {}) => {
    try {
        const url = typeof endpoint === 'string' ? buildUrl(endpoint) : endpoint;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
            ...options,
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`PUT ${endpoint} error:`, error);
        throw error;
    }
};

/**
 * Generic DELETE request
 */
const del = async (endpoint, options = {}) => {
    try {
        const url = typeof endpoint === 'string' ? buildUrl(endpoint) : endpoint;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`DELETE ${endpoint} error:`, error);
        throw error;
    }
};

// ===========================================
// EXPORT API OBJECT
// ===========================================
const api = {
    // Base URL - can be used to change backend
    baseUrl: API_BASE_URL,

    // Endpoints - use these in your API calls
    endpoints: ENDPOINTS,

    // HTTP Methods
    get,
    post,
    put,
    delete: del,

    // Helper functions
    buildUrl,
};

export default api;

