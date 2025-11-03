/**
 * CI/CD API Service
 * All CI/CD related API calls
 * Uses the main API service for HTTP requests
 */

import api from './api';
import cicdWebSocketService from '../services/cicdWebSocketService';

// ===========================================
// CI/CD API FUNCTIONS
// ===========================================

/**
 * Get health status from backend
 */
export const getHealth = async () => {
    return api.get(api.endpoints.health);
};

/**
 * Send run request via WebSocket
 * (Real-time communication)
 */
export const sendRunRequest = (runData) => {
    return cicdWebSocketService.sendRunRequest(runData);
};

/**
 * Get all runs
 * (Future REST API endpoint)
 */
export const getRuns = async () => {
    return api.get(api.endpoints.cicd.runs);
};

/**
 * Get single run by ID
 */
export const getRun = async (runId) => {
    return api.get(api.endpoints.cicd.run(runId));
};

/**
 * Rerun a specific run
 */
export const rerunRun = async (runId) => {
    return api.post(api.endpoints.cicd.rerun(runId));
};

/**
 * Delete a run
 */
export const deleteRun = async (runId) => {
    return api.delete(api.endpoints.cicd.delete(runId));
};

/**
 * Create new run
 */
export const createRun = async (runData) => {
    return api.post(api.endpoints.cicd.runs, runData);
};

// ===========================================
// WEB SOCKET FUNCTIONS
// ===========================================

/**
 * Connect to WebSocket
 */
export const connectWebSocket = (url = null) => {
    return cicdWebSocketService.connect(url);
};

/**
 * Disconnect from WebSocket
 */
export const disconnectWebSocket = () => {
    return cicdWebSocketService.disconnect();
};

/**
 * Check if WebSocket is connected
 */
export const isWebSocketConnected = () => {
    return cicdWebSocketService.isConnected();
};

/**
 * Set status update callback
 */
export const setStatusUpdateCallback = (callback) => {
    return cicdWebSocketService.setStatusUpdateCallback(callback);
};

/**
 * Set connection change callback
 */
export const setConnectionChangeCallback = (callback) => {
    return cicdWebSocketService.setConnectionChangeCallback(callback);
};

// ===========================================
// EXPORT ALL FUNCTIONS
// ===========================================
const cicdApi = {
    // REST API
    getHealth,
    getRuns,
    getRun,
    createRun,
    rerunRun,
    deleteRun,

    // WebSocket
    sendRunRequest,
    connectWebSocket,
    disconnectWebSocket,
    isWebSocketConnected,
    setStatusUpdateCallback,
    setConnectionChangeCallback,
};

export default cicdApi;

