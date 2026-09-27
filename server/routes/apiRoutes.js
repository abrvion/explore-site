import express from "express";
import { getSpace } from "../controllers/apiController.js";

const router = express.Router();

router.get("/space", getSpace);

export default router;