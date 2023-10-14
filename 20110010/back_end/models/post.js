const listpost = [
  {
    id: 1,
    content: "First post",
    author: "Hoang Nhan",
    listcomment: [
      { id: 1, content: "First comment on first post" },
      { id: 2, content: "Second comment on first post" },
    ],
  },
  {
    id: 2,
    content: "Second post",
    author: "Hoang Nhan",
    listcomment: [
      { id: 1, content: "First comment on second post" },
      { id: 2, content: "Second comment on second post" },
    ],
  },
];
module.exports = {
  listpost,
};
