import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coverPhotos: {
    type: [String],
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  photos: {
    type: [String],
  },
  featured: {
    type: [String],
    default: [
      "Free parking",
      "Pool",
      "FreeWifi",
      "Gym",
      "Air conditioning",
      "Bathtub",
    ],
  },
  serviceOne: {
    type: [String],
    default: [
      "Daily housekeeping",
      "Near the beach",
      "2 restarurants",
      "Outdoor pool",
      "Breakfast available",
      "Fitness center",
      "24-hour room service",
      "Coffee shop/cafe",
      "Babysitting",
      "8 meeting rooms",
      "UNESCO Sustainable Property",
      "24-hour front desk",
    ],
  },
  serviceTwo: {
    type: [String],
    default: [
      "Children stay free",
      "Babysitting (surcharge)",
      "Rollaway/extra beds",
      "Connecting/adjoining rooms available",
      "Private bathroom",
      "Daily housekeeping",
    ],
  },
  serviceThree: {
    type: [String],
    default: [
      "Cleaned with disinfectant",
      "Contactless check-in",
      "Hand sanitiser provided",
      "Personal protextive equipment",
    ],
  },
  rooms: [
    {
      name: String,
      view: String,
      sleep: Number,
      price: Number,
      bed: Number,
      photos: [],
    },
  ],
  roomsFeature: {
    type: [String],
    default: [
      "32 sq m",
      "Free Wifi",
      "Free self parking",
      "Collect and Redeeem",
    ],
  },
  roomPhotos: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  breakfast: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Hotel", HotelSchema);
