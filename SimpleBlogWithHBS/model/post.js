const postList = [
  {
    id: Number(1),
    title: "First Post",
    author: "Hoang Nhan",
    content: "This is the first post",
  },
];
let postSequence = postList.length + 1;

module.exports = {
  postList,
  postSequence,
};
