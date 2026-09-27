import { getSpaceData } from "../services/apiService.js";

export async function getSpace(req, res) {
    try {
        const data = await getSpaceData();

        res.json(data);
    } catch (error) {
        console.error(
            "Space API error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to fetch space data.",
            error: error.response?.data || error.message
        });
    }
}