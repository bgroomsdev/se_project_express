const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch(next);
};

const createClothingItem = (req, res, next) => {
  const { name, imageUrl, weather } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, imageUrl, weather, owner })
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided."));
      }
      return next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((clothingItem) => {
      if (req.user._id.toString() !== clothingItem.owner.toString()) {
        throw new ForbiddenError(
          "You are not authorized to delete this clothing item."
        );
      }
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.send({ message: "Clothing item deleted successfully." })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided."));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found."));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided."));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found."));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided."));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found."));
      }
      return next(err);
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
