const db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "Form" },
];

const { body, validationResult } = require("express-validator");

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

const validateUsername = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Name must be between 3 to 15 characters")
    .escape(),
];

const validateMessage = [
  body("message")
    .trim()
    .isLength({ min: 4, max: 30 })
    .withMessage("Message must be between 4 to 30 characters")
    .escape(),
];

exports.postNewMessage = [
  validateUsername,
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { username, message } = req.body;
      const added = new Date().toString();

      await db.postNewMessageToDb(message, username, added);

      res.redirect("/");
    } else {
      res.render("form", {
        errors: errors.array(),
        links: links,
      });
    }
  },
];
