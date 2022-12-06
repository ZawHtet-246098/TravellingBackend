import express from "express";
import mongoose from "mongoose";

import Hotel from "../models/hotel.js";

export const createHotel = async (req, res) => {
  const post = req.body;

  const newHotel = new Hotel({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newHotel.save();

    res.status(200).json(newHotel);
  } catch (error) {
    res.status(409).json({ msg: error });
  }
};

export const gethotelByCountry = async (req, res) => {
  const { country, numericFilters } = req.query;
  const queryObject = {};

  if (country) {
    queryObject.country = { $regex: country, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filter = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filter = filter.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  // const country = { $regex: rawConuntry, $options: "i" };
  try {
    // const titl
    const hotels = await Hotel.find(queryObject).sort("-rating");

    res.status(200).json({ data: hotels, nbHits: hotels.length });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getPost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await PostMessage.findById(id);

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getHotel = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const hotel = await Hotel.findById(id);

    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
