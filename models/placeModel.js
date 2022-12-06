import mongoose from "mongoose";

const placeModel = mongoose.Schema({
  city: String,
  abbr: String,
  airport: String,
  restriction: String,
  requirementOne: { type: String, default: "Vacinated travelers can visit" },
  requirementTwo: String,
  photo: String,
});

export default mongoose.model("PlaceModel", placeModel);
