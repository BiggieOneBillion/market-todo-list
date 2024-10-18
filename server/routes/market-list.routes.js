const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth-middleware"); // Auth middleware
const {
  deleteUserMarketList,
  addMoreToUserMarketList,
  getUserMarketList,
  getAllUsersList,
  createList,
  deleteParticularItem,
} = require("../controllers/market-list.controllers");
const { validateMarketList, validateMarketListItem } = require("../validation/market-list.validation");

// Create a new market list (Protected route)
router.post("/", authMiddleware, validateMarketList, createList);

// Fetch all market lists for the authenticated user (Protected route)
router.get("/", authMiddleware, getAllUsersList);

// Fetch a specific market list (Protected route)
router.get("/:id", authMiddleware, getUserMarketList);

// add more items to a specific market list (Protected route)
router.post(
  "/:id",
  authMiddleware,
  validateMarketListItem,
  addMoreToUserMarketList
);

// Delete a specific market list (Protected route)
router.delete("/:id", authMiddleware, deleteUserMarketList);

// delete a specific item in a particular list
router.delete("/:id/:index", authMiddleware, deleteParticularItem);


module.exports = router;
