import { Schema } from "mongoose";

var tokenSchema = new Schema({
  userId: { type: String, required: true },
  addedAt: { type: Date, required: true },
  lastUsed: { type: Date, required: false },
  token: { type: String, required: true },
  type: { type: String, required: true, enum: ["read", "set"] },
  tokenHasBeenRemoved: { type: Boolean, default: false, required: true },
});

tokenSchema.index({ userId: 1, type: 1 }, { unique: true });

export default tokenSchema;
