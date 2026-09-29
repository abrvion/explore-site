import {
    getSpaceData,
    getAnimeData,
    getCryptoData,
    getFactData
} from "../services/apiService.js";


// =========================================
// NASA APOD
// =========================================

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
            message: "Failed to fetch space data."
        });
    }
}


// =========================================
// RANDOM ANIME
// =========================================

export async function getAnime(req, res) {
    try {
        const data = await getAnimeData();

        res.json(data);

    } catch (error) {

        console.error(
            "Anime API error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to fetch anime data."
        });
    }
}

export async function getCrypto(req, res) {

    try {

        const data =
            await getCryptoData();

        res.json(data);

    } catch (error) {

    console.error(
        "Crypto API error:",
        error.response?.status,
        error.response?.data ||
        error.message
    );

    res.status(500).json({
        message: "Failed to fetch crypto data.",
        error:
            error.response?.data ||
            error.message
    });
}
}

export async function getFact(req, res) {

    try {

        const data =
            await getFactData();


        res.json(data);


    } catch (error) {

        console.error(
            "Fact API error:",
            error.response?.data ||
            error.message
        );


        res.status(500).json({
            message:
                "Failed to fetch random fact."
        });

    }

}