const express = require("express");

const Booking = require("../models/Booking");

const router = express.Router();


// CREATE BOOKING
router.post("/create", async (req, res) => {

  try {

    const {
      customerId,
      serviceName,
      address,
      date,
    } = req.body;

    const booking = await Booking.create({
      customerId,
      serviceName,
      address,
      date,
    });

    res.status(201).json({
      message: "Booking Created",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

// GET ALL BOOKINGS
router.get("/", async (req, res) => {

  try {

    const bookings = await Booking.find();

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// ACCEPT BOOKING
router.put("/accept/:id", async (req, res) => {

  try {

    const { vendorId } = req.body;

    const booking = await Booking.findByIdAndUpdate(

      req.params.id,

      {
        vendorId,
        status: "Accepted",
      },

      { new: true }

    );

    res.status(200).json({
      message: "Booking Accepted",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// COMPLETE BOOKING
router.put("/complete/:id", async (req, res) => {

  try {

    const booking = await Booking.findByIdAndUpdate(

      req.params.id,

      {
        status: "Completed",
      },

      { new: true }

    );

    res.status(200).json({
      message: "Booking Completed",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});
module.exports = router;