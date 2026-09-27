async function loadSpaceData() {
    const titleElement = document.getElementById("spaceTitle");
    const descriptionElement = document.getElementById("spaceDescription");
    const secondaryDescriptionElement =
        document.getElementById("spaceSecondary");
    const imageElement = document.getElementById("spaceImage");
    const dateElement = document.getElementById("spaceDate");
    const imageLabelElement = document.getElementById("spaceImageLabel");
    const imageLinkElement = document.getElementById("spaceImageLink");
    const learnMoreButton = document.getElementById("spaceLearnMore");

    try {
        const response = await fetch("/api/space");

        if (!response.ok) {
            throw new Error("Failed to fetch space data.");
        }

        const data = await response.json();

        titleElement.textContent = data.title;

        descriptionElement.textContent = data.explanation;

        secondaryDescriptionElement.textContent =
            "Today's Astronomy Picture of the Day from NASA.";

        imageElement.src = data.hdurl || data.url;
        imageElement.alt = data.title;

        dateElement.textContent = data.date;

        imageLabelElement.textContent = "NASA APOD";

        imageLinkElement.href = data.hdurl || data.url;

        learnMoreButton.onclick = () => {
            imageLinkElement.click();
        };

    } catch (error) {
        console.error("Failed to load space data:", error);

        titleElement.textContent = "Unable to load today's space discovery.";

        descriptionElement.textContent =
            "Something went wrong while connecting to NASA.";

        secondaryDescriptionElement.textContent =
            "Please try again later.";

        dateElement.textContent = "Unavailable";
    }
}

loadSpaceData();