const mongoose = require("mongoose");

// Define a schema for the Image subdocuments
const imageSchema = new mongoose.Schema(
  {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
  },
  {
    _id: false,
  }
);

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    size: {
      type: Array,
      required: false,
    },
    highlights: {
      type: Array,
      required: false,
    },
    image: [imageSchema], // Use the Image schema for the image field
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
