const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

const {
  getAllPosts,
  seePostDetails,
  deletePost,
  addPost,
  modifyPost,
  openEditForm,
} = require("../controller/postController.js");

const {
  addCommentToPost,
  deleteComment,
} = require("../controller/commentController.js");

router.get("/", getAllPosts);
router.get("/posts/:postId", seePostDetails);
router.get("/posts/editForm/:postId", openEditForm);

router.post("/posts", addPost);
router.post("/posts/delete/:postId", deletePost);
router.post("/posts/editPost/:postId", modifyPost);

router.post("/posts/:postId/addComment", addCommentToPost);
router.delete("/comments/:commentId", deleteComment);

module.exports = router;
