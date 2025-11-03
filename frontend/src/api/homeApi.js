/**
 * Home API Service
 * All home dashboard related API calls
 */

import api from './api';

/**
 * Get home dashboard data
 */
export const getHomeData = async () => {
    try {
        return await api.get(api.endpoints.home.dashboard);
    } catch (error) {
        console.error('Failed to fetch home data:', error);
        // Return fallback data if API fails
        return {
            title: "Welcome to Avnet",
            description: "This is the home dashboard with sample data.",
            stats: [
                { label: "Total Users", value: 1250, trend: "+12%" },
                { label: "Active Activity", value: 89, trend: "+5%" },
                { label: "Performance", value: 94, trend: "+2%" },
            ],
            recentActivity: [
                { action: "User Login", time: "2 minutes ago", status: "success" },
                { action: "Data Sync", time: "5 minutes ago", status: "success" },
                { action: "System Update", time: "1 hour ago", status: "warning" },
            ],
        };
    }
};

/**
 * Get home stats
 */
export const getHomeStats = async () => {
    return api.get(api.endpoints.home.stats);
};

const homeApi = {
    getHomeData,
    getHomeStats,
};

export default homeApi;

