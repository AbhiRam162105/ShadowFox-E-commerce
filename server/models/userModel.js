const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Wishlist: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    Orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: [],
      },
    ],
    Address: [
      {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
