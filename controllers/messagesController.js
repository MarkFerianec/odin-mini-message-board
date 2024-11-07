const db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "Form" },
];

exports.getIndex = async (req, res) => {
  const messagesFromDB = await db.getAllMessages();

  res.render("index", { messages: messagesFromDB, links: links });
};

exports.getNewMessageForm = (req, res) => {
  res.render("form", { links: links });
};

exports.getMessageDetails = async (req, res) => {
  let { messageId } = req.params;

  const message = await db.getMessageDetails(messageId);

  res.render("messagedetails", { message: message.rows[0], links: links });
};

exports.postNewMessage = async (req, res) => {
  const { message, username } = req.body;
  const added = new Date().toString();

  await db.postNewMessageToDb(message, username, added);

  res.redirect("/");
};
