import axios from "axios";

const NASA_API_URL = "https://api.nasa.gov/planetary/apod";

export async function getSpaceData() {
    const response = await axios.get(NASA_API_URL, {
        params: {
            api_key: process.env.NASA_API_KEY
        }
    });

    return response.data;
}