const express = require("express");
const {
  getFriendById,
  addFriend,
  getAllFriends,
  viewFriend,
} = require("../controllers/friendController");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get("/", getAllFriends);

router.post("/20110010/:id", addFriend);

router.get("/20110010/:id", getFriendById);

router.get("/message/:id", viewFriend);

router.get("/message", viewFriend);

module.exports = router;
