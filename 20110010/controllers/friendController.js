const { mygroup } = require("../models/friend.js");

function getFriendById(req, res) {
  const id = Number(req.params.id);
  let friend = null;

  mygroup.forEach((f) => {
    if (f.id === id) friend = f;
  });

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(400).json({
      error: "Not valid",
    });
  }
}

function getAllFriends(req, res) {
  res.status(200).json(mygroup);
}

function addFriend(req, res) {
  //   console.log(`${req.body}`);

  let isIdExisted = false;
  mygroup.forEach((f) => {
    if (f.id === Number(req.params.id)) {
      isIdExisted = true;
    }
  });

  if (!req.body.name || isIdExisted) {
    return res.status(400).json({
      error: "Not valid",
    });
  }

  const friend = { id: Number(req.params.id), name: req.body.name };
  mygroup.push(friend);
  res.status(200).json(friend);
}

function viewFriend(req, res) {
  const id = Number(req.params.id);

  let friends = [];

  if (id) {
    mygroup.forEach((f) => {
      if (f.id === id) friends.push(f);
    });
  } else {
    friends = mygroup;
  }

  if (friends) {
    const messageHtml = generateMessageHtml(friends);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(messageHtml);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not valid" }));
  }
}
function generateMessageHtml(friends) {
  if (friends.length === 0) {
    return "<html><body>Not valid</body></html>";
  }

  const listItems = friends
    .map((friend) => `<li>${convertToUnicode(friend.name)}</li>`)
    .join("");
  return `<html><body><ul>${listItems}</ul></body></html>`;
}
// Convert the data into unicode character
function convertToUnicode(input) {
  let unicodeString = "";
  for (let i = 0; i < input.length; i++) {
    const unicodeChar = input.charCodeAt(i).toString(16).toUpperCase();
    unicodeString += `&#x${unicodeChar}`;
  }
  return unicodeString;
}

module.exports = {
  getFriendById,
  addFriend,
  getAllFriends,
  viewFriend,
};
