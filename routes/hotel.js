import express from "express";
const router = express.Router();

// import { creatPlace, getPlaces } from "../controllers/places.js";

import {
  createHotel,
  gethotelByCountry,
  getHotel,
} from "../controllers/hotel.js";

router.post("/", createHotel);
router.get("/search", gethotelByCountry);
router.get("/:id", getHotel);

export default router;
