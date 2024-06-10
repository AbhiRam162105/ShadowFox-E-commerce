const express = require("express");
const router = express.Router();
const cors = require("cors");
const uploadPhoto = require("../middlewares/upload");
const {
  updateItem,
  deleteItem,
  createItem,
  getAllItems,
} = require("../controllers/itemsController");

router.get("/", cors(), getAllItems);

router.post("/", createItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

module.exports = router;
