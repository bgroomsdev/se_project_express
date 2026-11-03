const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.get("/", getClothingItems);

router.post("/", auth, validateClothingItem, createClothingItem);
router.delete("/:itemId", auth, validateId, deleteClothingItem);

router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
