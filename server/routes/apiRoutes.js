import express from "express";

import {
    getSpace,
    getAnime,
    getCrypto,
    getFact
} from "../controllers/apiController.js";

const router = express.Router();


// NASA APOD
router.get("/space", getSpace);


// Random Anime
router.get("/anime", getAnime);

// Crypto Data
router.get("/crypto", getCrypto);

// Random Fact
router.get(
    "/fact",
    getFact
);


export default router;