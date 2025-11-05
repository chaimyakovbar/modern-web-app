// Status constants and helpers used across CI/CD components

export const STATUSES = {
    PENDING: "pending",
    RUNNING: "running",
    SUCCESS: "success",
    FAILED: "failed",
    CANCELLED: "cancelled",
};

// Returns MUI Chip color key for a given status
export function getStatusColor(status) {
    switch (status) {
        case STATUSES.SUCCESS:
            return "success";
        case STATUSES.FAILED:
            return "error";
        case STATUSES.RUNNING:
            return "default";
        case STATUSES.CANCELLED:
            return "warning";
        default:
            return "default";
    }
}


