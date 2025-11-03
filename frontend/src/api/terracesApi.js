/**
 * Terraces API Service
 * All terraces related API calls
 */

import api from './api';

/**
 * Get all terraces
 */
export const getTerraces = async () => {
    return api.get(api.endpoints.terraces.list);
};

/**
 * Get single terrace by ID
 */
export const getTerrace = async (terraceId) => {
    return api.get(api.endpoints.terraces.terrace(terraceId));
};

const terracesApi = {
    getTerraces,
    getTerrace,
};

export default terracesApi;

