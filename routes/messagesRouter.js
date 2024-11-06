const { Router } = require("express");
const messagesRouter = Router();

const messagesController = require("../controllers/messagesController");

messagesRouter.get("/", messagesController.getIndex);

messagesRouter.get("/new", messagesController.getNewMessageForm);

messagesRouter.get("/:messageId", messagesController.getMessageDetails);

messagesRouter.post("/new", messagesController.postNewMessage);

module.exports = messagesRouter;
