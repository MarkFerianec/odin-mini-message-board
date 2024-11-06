const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "Form" },
];

exports.getIndex = (req, res) => {
  res.render("index", { messages: messages, links: links });
};

exports.getNewMessageForm = (req, res) => {
  res.render("form", { links: links });
};

exports.getMessageDetails = (req, res) => {
  const { messageId } = req.params;
  res.render("messagedetails", { message: messages[messageId], links: links });
};

exports.postNewMessage = (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
};
