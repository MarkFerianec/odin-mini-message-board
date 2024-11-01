const express = require("express");
const app = express();

const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.render("index", { messages: messages, links: links });
});

app.get("/new", (req, res) => {
  res.render("form", { links: links });
});

app.get("/:messageId", (req, res) => {
  const { messageId } = req.params;
  res.render("messagedetails", { message: messages[messageId], links: links });
});

app.post("/new", (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`My Express app - listening on port ${PORT}!`);
});
