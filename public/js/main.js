// =========================================
// NASA APOD
// =========================================

async function loadSpaceData() {

    const heroImage =
        document.getElementById("spaceHeroImage");

    const heroLoader =
        document.getElementById("heroLoader");

    const titleElement =
        document.getElementById("spaceTitle");

    const descriptionElement =
        document.getElementById("spaceDescription");

    const dateElement =
        document.getElementById("spaceDate");

    const learnMoreButton =
        document.getElementById("spaceLearnMore");


    try {

        const response =
            await fetch("/api/space");

        if (!response.ok) {
            throw new Error(
                "Failed to fetch space data."
            );
        }


        const data =
            await response.json();


        // -----------------------------------------
        // NASA information
        // -----------------------------------------

        titleElement.textContent =
            data.title;


        const shortDescription =
            data.explanation.length > 260
                ? `${data.explanation.slice(0, 260)}...`
                : data.explanation;


        descriptionElement.textContent =
            shortDescription;


        // Display the actual date returned
        // by NASA instead of assuming the
        // browser's current date.

        dateElement.textContent =
            formatSpaceDate(data.date);


        learnMoreButton.href =
            data.hdurl || data.url;


        // -----------------------------------------
        // NASA image loading
        // -----------------------------------------

        const normalImageUrl =
            data.url;

        const hdImageUrl =
            data.hdurl;


        const normalImage =
            new Image();


        normalImage.onload = () => {

            heroImage.src =
                normalImageUrl;

            heroImage.alt =
                data.title;

            heroImage.classList.add(
                "loaded"
            );

            heroLoader.classList.add(
                "hidden"
            );


            // Load HD image in the background.

            if (
                hdImageUrl &&
                hdImageUrl !== normalImageUrl
            ) {

                preloadHdImage(
                    hdImageUrl,
                    data.title
                );
            }
        };


        normalImage.onerror = () => {

            heroLoader.classList.add(
                "hidden"
            );

            titleElement.textContent =
                "Space discovery unavailable.";

            descriptionElement.textContent =
                "NASA's image could not be loaded right now.";
        };


        normalImage.src =
            normalImageUrl;


        // -----------------------------------------
        // HD NASA image
        // -----------------------------------------

        function preloadHdImage(
            url,
            title
        ) {

            const hdImage =
                new Image();


            hdImage.onload = () => {

                heroImage.src =
                    url;

                heroImage.alt =
                    title;

                heroImage.classList.add(
                    "hd-loaded"
                );
            };


            hdImage.onerror = () => {

                console.warn(
                    "HD NASA image could not be loaded."
                );
            };


            hdImage.src =
                url;
        }


    } catch (error) {

        console.error(
            "Failed to load space data:",
            error
        );


        heroLoader.classList.add(
            "hidden"
        );


        titleElement.textContent =
            "Unable to load today's discovery.";


        descriptionElement.textContent =
            "Something went wrong while connecting to NASA.";


        dateElement.textContent =
            "Unavailable";
    }
}


// =========================================
// NASA DATE FORMAT
// =========================================

function formatSpaceDate(dateString) {

    if (!dateString) {
        return "Date unavailable";
    }


    const date =
        new Date(`${dateString}T00:00:00`);


    if (Number.isNaN(date.getTime())) {
        return dateString;
    }


    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    ).format(date);
}


// =========================================
// RANDOM ANIME
// =========================================

async function loadAnimeData() {

    const titleElement =
        document.getElementById("animeTitle");

    const scoreElement =
        document.getElementById("animeScore");

    const yearElement =
        document.getElementById("animeYear");

    const typeElement =
        document.getElementById("animeType");

    const imageElement =
        document.getElementById("animeImage");

    const descriptionElement =
        document.getElementById("animeDescription");

    const readMoreButton =
        document.getElementById("animeReadMore");


    try {

        const response =
            await fetch("/api/anime");


        if (!response.ok) {

            throw new Error(
                "Failed to fetch anime data."
            );
        }


        const data =
            await response.json();


        // -----------------------------------------
        // Anime information
        // -----------------------------------------

        titleElement.textContent =
            data.title ||
            "Unknown anime";


        scoreElement.textContent =
            data.score ?? "N/A";


        yearElement.textContent =
            data.year ||
            "Unknown year";


        typeElement.textContent =
            data.type ||
            "Unknown type";


        descriptionElement.textContent =
            data.description ||
            "No description available.";


        // -----------------------------------------
        // Anime artwork
        // -----------------------------------------

        if (data.image) {

            imageElement.src =
                data.image;

            imageElement.alt =
                data.title ||
                "Anime artwork";
        }


        // -----------------------------------------
        // Read More
        // -----------------------------------------

        if (data.url) {

            readMoreButton.href =
                data.url;

        } else {

            readMoreButton.removeAttribute(
                "href"
            );

            readMoreButton.setAttribute(
                "aria-disabled",
                "true"
            );
        }


    } catch (error) {

        console.error(
            "Failed to load anime:",
            error
        );


        titleElement.textContent =
            "Anime unavailable";


        scoreElement.textContent =
            "—";


        yearElement.textContent =
            "—";


        typeElement.textContent =
            "—";


        descriptionElement.textContent =
            "We couldn't discover an anime right now.";


        readMoreButton.removeAttribute(
            "href"
        );

        readMoreButton.setAttribute(
            "aria-disabled",
            "true"
        );
    }
}


// =========================================
// INITIAL LOAD
// =========================================

// =========================================
// CRYPTO
// =========================================

async function loadCryptoData() {

    const bitcoinPrice =
        document.getElementById(
            "bitcoinPrice"
        );

    const bitcoinChange =
        document.getElementById(
            "bitcoinChange"
        );


    const ethereumPrice =
        document.getElementById(
            "ethereumPrice"
        );

    const ethereumChange =
        document.getElementById(
            "ethereumChange"
        );


    const solanaPrice =
        document.getElementById(
            "solanaPrice"
        );

    const solanaChange =
        document.getElementById(
            "solanaChange"
        );


    const chainlinkPrice =
        document.getElementById(
            "chainlinkPrice"
        );

    const chainlinkChange =
        document.getElementById(
            "chainlinkChange"
        );


    const bnbPrice =
        document.getElementById(
            "bnbPrice"
        );

    const bnbChange =
        document.getElementById(
            "bnbChange"
        );


    try {

        const response =
            await fetch("/api/crypto");


        if (!response.ok) {

            throw new Error(
                "Failed to fetch crypto data."
            );

        }


        const data =
            await response.json();


        updateCryptoCoin(
            data.bitcoin,
            bitcoinPrice,
            bitcoinChange
        );


        updateCryptoCoin(
            data.ethereum,
            ethereumPrice,
            ethereumChange
        );


        updateCryptoCoin(
            data.solana,
            solanaPrice,
            solanaChange
        );


        updateCryptoCoin(
            data.chainlink,
            chainlinkPrice,
            chainlinkChange
        );


        updateCryptoCoin(
            data.bnb,
            bnbPrice,
            bnbChange
        );


    } catch (error) {

        console.error(
            "Failed to load crypto data:",
            error
        );


        bitcoinPrice.textContent = "—";
        bitcoinChange.textContent = "Unavailable";


        ethereumPrice.textContent = "—";
        ethereumChange.textContent = "Unavailable";


        solanaPrice.textContent = "—";
        solanaChange.textContent = "Unavailable";


        chainlinkPrice.textContent = "—";
        chainlinkChange.textContent = "Unavailable";


        bnbPrice.textContent = "—";
        bnbChange.textContent = "Unavailable";

    }

}

// =========================================
// CRYPTO DISPLAY
// =========================================

function updateCryptoCoin(
    coin,
    priceElement,
    changeElement
) {

    if (!coin) {
        return;
    }


    priceElement.textContent =
        formatCryptoPrice(
            coin.price
        );


    const change =
        Number(coin.change24h);


    if (Number.isNaN(change)) {

        changeElement.textContent =
            "—";

        changeElement.classList.remove(
            "positive",
            "negative"
        );

        return;
    }


    const sign =
        change >= 0
            ? "+"
            : "";


    changeElement.textContent =
        `${sign}${change.toFixed(2)}%`;


    changeElement.classList.remove(
        "positive",
        "negative"
    );


    changeElement.classList.add(
        change >= 0
            ? "positive"
            : "negative"
    );

}


// =========================================
// CRYPTO PRICE FORMAT
// =========================================

function formatCryptoPrice(price) {

    if (
        typeof price !== "number" ||
        Number.isNaN(price)
    ) {
        return "—";
    }


    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits:
                price >= 1
                    ? 2
                    : 6
        }
    ).format(price);

}

// =========================================
// RANDOM FACT
// =========================================

async function loadFactData() {

    const factBackground =
        document.getElementById(
            "factBackground"
        );

    const factText =
        document.getElementById(
            "factText"
        );

    try {

        const response =
            await fetch("/api/fact");

        if (!response.ok) {
            throw new Error(
                "Failed to fetch fact data."
            );
        }

        const fact =
            await response.json();


        // -----------------------------
        // FACT
        // -----------------------------

        factText.textContent =
            fact.text ||
            "We couldn't discover a fact right now.";

    } catch (error) {

        console.error(
            "Failed to load fact:",
            error
        );

        factText.textContent =
            "We couldn't discover something unexpected right now.";
    }
}


// =========================================
// FACT CARD NASA BACKGROUND
// =========================================

async function loadFactBackground() {

    const factBackground =
        document.getElementById(
            "factBackground"
        );

    try {

        const response =
            await fetch("/api/space");

        if (!response.ok) {
            throw new Error(
                "Failed to fetch NASA data."
            );
        }

        const space =
            await response.json();


        // -----------------------------
        // NASA BACKGROUND
        // -----------------------------

        const nasaImage =
            space.hdurl ||
            space.url;

        if (nasaImage) {

            const image =
                new Image();

            image.onload = () => {

                factBackground.src =
                    nasaImage;

                factBackground.alt =
                    space.title ||
                    "NASA space discovery";

            };

            image.onerror = () => {

                console.warn(
                    "NASA image could not be loaded for fact card."
                );

            };

            image.src =
                nasaImage;
        }

    } catch (error) {

        console.error(
            "Failed to load fact card background:",
            error
        );

    }
}


// =========================================
// FACT REFRESH BUTTON
// =========================================

const factRefresh =
    document.getElementById(
        "factRefresh"
    );

if (factRefresh) {

    factRefresh.addEventListener(
        "click",
        () => {

            loadFactData();

        }
    );

}
loadSpaceData();
loadAnimeData();
loadCryptoData();
loadFactData();
loadFactBackground();