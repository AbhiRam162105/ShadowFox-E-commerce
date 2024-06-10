const express = require("express");
const router = express.Router();
const {
  Login,
  Register,
  Logout,
  validateToken,
} = require("../controllers/authentication");
const {
  updateWishlist,
  getWishlistItems,
} = require("../controllers/wishlistController");

// Auth route
router.get("/", (req, res) => {
  res.send("Auth route");
});
router.post("/login", Login);
router.post("/validate", validateToken);
router.post("/register", Register);
router.post("/logout", Logout);
// Route to add an item to the user's wishlist
router.patch("/wishlist/:userId/add", updateWishlist);
router.get("/wishlist/:userId", getWishlistItems);

module.exports = router;
