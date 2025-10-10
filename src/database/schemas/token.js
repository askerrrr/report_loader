var { Schema } = require("mongoose");

var token_schema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: false, default: "" },
  schemaVersion: { type: Number, required: false },
});

module.exports = token_schema;
