const postList = require("../model/post.js");
const commentList = require("../model/comment.js");

function getAllPosts(req, res) {
  // res.status(200).json({ postList: returnedPosts });
  res.render("posts/getAllPost.hbs", { posts: postList.postList });
}

function seePostDetails(req, res) {
  const postId = Number(req.params.postId);

  var post = postList.postList.find((p) => p.id === postId);

  if (post) {
    comments = [];

    commentList.commentList.forEach((comment) => {
      if (comment.postId === postId) {
        comments.push(comment);
      }
    });
    post.comments = comments;
    res.render("posts/getDetailPost", { post: post, comment: comments });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}

function openEditForm(req, res) {
  const postId = Number(req.params.postId);

  var post = postList.postList.find((p) => p.id === postId);

  res.render("posts/editPost", { post: post });
}

function deletePost(req, res) {
  const postId = Number(req.params.postId);
  const post = postList.postList.find((p) => p.id === postId);

  if (post) {
    postList.postList.splice(postList.postList.indexOf(post), 1);
    getAllPosts(req, res);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}

function addPost(req, res) {
  const postId = postList.postSequence;
  const postAuthor = req.body.author;
  const postContent = req.body.content;
  const title = req.body.title;

  const post = {
    id: postId,
    title: title,
    author: postAuthor,
    content: postContent,
    comments: [],
  };

  postList.postList.push(post);
  postList.postSequence++;
  getAllPosts(req, res);
}

function modifyPost(req, res) {
  const postId = Number(req.params.postId);
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;

  const post = postList.postList.find((p) => p.id === postId);
  if (post) {
    post.title = title;
    post.content = content;
    post.author = author;
    getAllPosts(req, res);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}

module.exports = {
  getAllPosts,
  seePostDetails,
  deletePost,
  addPost,
  modifyPost,
  openEditForm,
};
