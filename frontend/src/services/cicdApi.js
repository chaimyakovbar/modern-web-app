import config from "../config/config";

// Normalize initial run response (object keyed by submitted names)
// into an array of rows for the table.
function normalizeRunResponse(responseObj) {
    if (!responseObj || typeof responseObj !== "object") return [];
    return Object.entries(responseObj).map(([name, value]) => ({
        name,
        projectId: value?.projectId,
        projectUrl: value?.projectUrl,
        pinplaneId: value?.pinplaneId,
        success: !!value?.success,
        message: value?.message ?? "",
        status: value?.status || "pending",
    }));
}

export async function runProjects(payload, isSingle = false) {
    const endpoint = isSingle
        ? config.api.endpoints.cicd.singleRun
        : config.api.endpoints.cicd.runs;

    const res = await config.api.http.post(endpoint, payload);
    // Expecting: object of objects keyed by submitted names
    return normalizeRunResponse(res);
}

export async function fetchStatuses(pinplaneToProjectMap) {
    // Body shape: { [pinplaneId]: projectId }
    if (!pinplaneToProjectMap || Object.keys(pinplaneToProjectMap).length === 0) {
        return {};
    }

    const endpoint = config.api.endpoints.cicd.status;
    // Debug: show exactly what we send to the server
    // Show full URL + payload for transparency
    // Example: STATUS POST -> http://localhost:5261/api/cicd/status { "123": "abc" }
    console.log(
        "STATUS POST ->",
        `${config.api.baseUrl}${endpoint}`,
        pinplaneToProjectMap
    );

    const res = await config.api.http.post(endpoint, pinplaneToProjectMap);
    // Return as-is (object of objects). Expected each value contains at least { status }
    return res || {};
}

export function isTerminalStatus(status) {
    return status === "success" || status === "failed" || status === "cancelled";
}


