const commentList = require("../model/comment.js");
const { seePostDetails } = require("../controller/postController.js");

function addCommentToPost(req, res) {
  const commentId = commentList.commentSequence;
  const commentPostId = Number(req.params.postId);
  const commentAuthor = req.body.author;
  const commentContent = req.body.content;

  const comment = {
    id: commentId,
    postId: commentPostId,
    author: commentAuthor,
    content: commentContent,
  };

  commentList.commentList.push(comment);
  commentList.commentSequence++;
  seePostDetails(req, res);
  // res.status(200).json(commentList);
}

function deleteComment(req, res) {
  const commentId = Number(req.params.commentId);
  const comment = commentList.commentList.find((c) => c.id === commentId);

  if (comment) {
    commentList.commentList.splice(commentList.commentList.indexOf(comment), 1);
    res.status(200).json({ message: "Comment deleted" });
  } else {
    res.status(404).json({ message: "Comment not found!" });
  }
}

module.exports = {
  addCommentToPost,
  deleteComment,
};
