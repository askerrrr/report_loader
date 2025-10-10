var { Schema } = require("mongoose");

var reportSchema = new Schema(
  {
    reportId: { type: String, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
    schemaVersion: { type: Number, required: false },
  },
  { _id: false }
);

var monthPeriodSchema = new Schema(
  {
    month: { type: String, required: false },
    reportIds: [{ type: reportSchema, required: false }],
    schemaVersion: { type: Number, required: false },
  },
  { _id: false }
);

var yearsPeriodSchema = new Schema(
  {
    year: { type: String, required: false },
    months: [{ type: monthPeriodSchema }],
    schemaVersion: { type: Number, required: false },
  },
  { _id: false }
);

var reportsTreeSchema = new Schema({
  userId: { type: String, required: true },
  years: [{ type: yearsPeriodSchema, required: false }],
  schemaVersion: { type: Number, required: false },
});

module.exports = reportsTreeSchema;
