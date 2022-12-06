import express from "express";
import mongoose from "mongoose";

import PlaceModel from "../models/placeModel.js";

export const creatPlace = async (req, res) => {
  const place = req.body;
  console.log(place);

  const newPlace = new PlaceModel({
    ...place,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPlace.save();

    res.status(200).json(newPlace);
  } catch (error) {
    res.status(409).json({ msg: error });
  }
};

export const getPlaces = async (req, res) => {
  try {
    const places = await PlaceModel.find();

    res.status(200).json({ data: places });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
