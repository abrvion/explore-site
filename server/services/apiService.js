import axios from "axios";


// =========================================
// NASA APOD
// =========================================

const NASA_API_URL =
    "https://api.nasa.gov/planetary/apod";

export async function getSpaceData() {

    const response = await axios.get(
        NASA_API_URL,
        {
            params: {
                api_key: process.env.NASA_API_KEY
            }
        }
    );

    return response.data;
}


// =========================================
// RANDOM ANIME
// =========================================

const ANIME_API_URL =
    "https://api.tenrai.org/v1/random/anime?sfw-strict";

export async function getAnimeData() {

    const response = await axios.get(
        ANIME_API_URL
    );

    const anime =
        response.data.data;


    return {

        title:
            anime.title,

        score:
            anime.score,

        type:
            anime.type,

        year:
            anime.year,

        image:
            anime.images?.jpg?.image_url,

        description:
            anime.synopsis,

        url:
            anime.url

    };
}

// =========================================
// CRYPTO
// =========================================

const CRYPTO_API_URL =
    "https://api.coingecko.com/api/v3/simple/price";


export async function getCryptoData() {

    const response = await axios.get(
        CRYPTO_API_URL,
        {
            params: {
                ids:
                    "bitcoin,ethereum,solana,chainlink,binancecoin",

                vs_currencies:
                    "usd",

                include_24hr_change:
                    true
            }
        }
    );


    const crypto =
        response.data;


    console.log(
        "CoinGecko response:",
        crypto
    );


    return {

        bitcoin: {
            name: "Bitcoin",
            symbol: "BTC",
            price:
                crypto.bitcoin.usd,
            change24h:
                crypto.bitcoin.usd_24h_change
        },


        ethereum: {
            name: "Ethereum",
            symbol: "ETH",
            price:
                crypto.ethereum.usd,
            change24h:
                crypto.ethereum.usd_24h_change
        },


        solana: {
            name: "Solana",
            symbol: "SOL",
            price:
                crypto.solana.usd,
            change24h:
                crypto.solana.usd_24h_change
        },


        chainlink: {
            name: "Chainlink",
            symbol: "LINK",
            price:
                crypto.chainlink.usd,
            change24h:
                crypto.chainlink.usd_24h_change
        },


        bnb: {
            name: "BNB",
            symbol: "BNB",
            price:
                crypto.binancecoin.usd,
            change24h:
                crypto.binancecoin.usd_24h_change
        }

    };
}

// =========================================
// RANDOM FACT
// =========================================

const FACT_API_URL =
    "https://uselessfacts.jsph.pl/api/v2/facts/random";

export async function getFactData() {

    const response =
        await axios.get(
            FACT_API_URL
        );


    const fact =
        response.data;


    return {
        text: fact.text,
        source: fact.source
    };

}