const mongoose = require("mongoose");
const User = require("../models/userModel"); // Ensure this path is correct
const Item = require("../models/itemsModel");

const updateWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newWishlistItems = req.body.map((item) => ({
      itemId: item._id, // Change _id to itemId to match the schema
      quantity: item.quantity || 1,
    }));
    console.log("====================================");
    console.log("newWishlistItems", newWishlistItems);
    console.log("====================================");

    // Find the user by ID and update their wishlist
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { Wishlist: newWishlistItems } },
      { new: true, populate: ["Wishlist.itemId"] } // Populate the wishlist items
    );

    // Since findOneAndUpdate returns the document before the update was applied,
    // we need to manually populate the wishlist again to get the updated result
    const populatedUser = await User.populate(updatedUser, {
      path: "Wishlist.itemId",
    });

    res.status(200).send(populatedUser.Wishlist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Step 1: Fetch the user document
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Step 2: Extract the IDs of the wishlist items
    const wishlistItemIds = user.Wishlist.map((item) => item._id);
    console.log("====================================");
    console.log("wishlistItemIds", wishlistItemIds);
    console.log("====================================");

    // Initialize an empty array to hold the fetched items
    let fetchedItems = [];

    // Step 3: Retrieve the related items using findById for each ID
    for (const itemId of wishlistItemIds) {
      const item = await Item.findById(itemId);
      console.log("====================================");
      console.log("item", await Item.findById("630be0770dd6605053c3f081"));
      console.log("====================================");
      fetchedItems.push(item); // Append the fetched item to the array
    }
    console.log("====================================");
    console.log("fetchedItems", fetchedItems);
    console.log("====================================");

    // Transform the retrieved items to match the desired output format
    const transformedWishlist = fetchedItems.map((item) => ({
      ...item, // Convert Mongoose document to plain JS object
    }));

    res.status(200).send(transformedWishlist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { updateWishlist, getWishlistItems };
