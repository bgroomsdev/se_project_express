const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createClothingItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, imageUrl, weather, owner })
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid data provided." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((clothingItem) => {
      if (req.user._id.toString() === clothingItem.owner.toString()) {
        return ClothingItem.findByIdAndDelete(itemId)
          .then(() =>
            res.send({ message: "Clothing item deleted successfully." })
          )
          .catch((err) => {
            console.error(err);
            return res
              .status(SERVER_ERROR)
              .send({ message: "An error has occurred on the server." });
          });
      }
      return res.status(FORBIDDEN).send({
        message: "You are not authorized to delete this clothing item.",
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid data provided." });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid data provided." });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA)
          .send({ message: "Invalid data provided." });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
