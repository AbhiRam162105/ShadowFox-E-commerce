const Item = require("../models/itemsModel"); // Adjust the path according to your project structure

// Create a new item
const createItem = async (req, res) => {
  try {
    // Check if the request body is an array
    if (!Array.isArray(req.body)) {
      return res
        .status(400)
        .json({ message: "Input must be an array of items" });
    }

    // Iterate over each item in the array and save it
    for (const itemData of req.body) {
      const newItem = new Item(itemData);
      await newItem.save();
      console.log(`Item ${newItem.name} saved successfully`);
    }

    // Respond with a success message indicating all items were saved
    res.status(201).json({ message: "All items added successfully" });
  } catch (err) {
    // Handle any errors that occurred during the process
    res.status(500).json({ message: err.message });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("image");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("image");
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing item
const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("image");
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an item by ID
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
