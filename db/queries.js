const pool = require("./pool");

async function getAllMessages() {
  // This must be multiple rows???
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function postNewMessageToDb(message, username, added) {
  await pool.query(
    "INSERT INTO messages(message, username, added) VALUES ($1, $2, $3)",
    [message, username, added]
  );
}

async function getMessageDetails(messageId) {
  // This must be just one row???
  const row = await pool.query("SELECT * FROM messages WHERE id = ($1)", [
    messageId,
  ]);
  return row;
}

module.exports = {
  getAllMessages,
  postNewMessageToDb,
  getMessageDetails,
};
