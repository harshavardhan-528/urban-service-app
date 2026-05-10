const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  serviceName: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);