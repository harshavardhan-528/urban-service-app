const express = require("express");

const Booking = require("../models/Booking");

const router = express.Router();


// ==========================================
// CREATE BOOKING
// POST /api/bookings
// ==========================================

router.post("/", async (req, res) => {

  try {

    const {
      customerId,
      serviceName,
      address,
      date,
    } = req.body;

    console.log("Booking Request:", req.body);

    if (
      !customerId ||
      !serviceName ||
      !address ||
      !date
    ) {

      return res.status(400).json({

        message:
          "All booking fields are required",

      });

    }

    const booking = await Booking.create({

      customerId,

      serviceName,

      address,

      date,

      status: "Pending",

    });

    res.status(201).json({

      message: "Booking Created",

      booking,

    });

  } catch (error) {

    console.log(
      "Create Booking Error:",
      error
    );

    res.status(500).json({

      message: error.message,

    });

  }

});


// ==========================================
// GET ALL BOOKINGS
// GET /api/bookings
// ==========================================

router.get("/", async (req, res) => {

  try {

    const bookings =
      await Booking.find();

    res.status(200).json(bookings);

  } catch (error) {

    console.log(
      "Get Bookings Error:",
      error
    );

    res.status(500).json({

      message: error.message,

    });

  }

});


// ==========================================
// ACCEPT BOOKING
// PUT /api/bookings/accept/:id
// ==========================================

router.put(
  "/accept/:id",
  async (req, res) => {

    try {

      const { vendorId } =
        req.body;

      if (!vendorId) {

        return res.status(400).json({

          message:
            "Vendor ID is required",

        });

      }

      const booking =
        await Booking.findByIdAndUpdate(

          req.params.id,

          {
            vendorId,

            status: "Accepted",
          },

          {
            new: true,
          }

        );

      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found",

        });

      }

      res.status(200).json({

        message:
          "Booking Accepted",

        booking,

      });

    } catch (error) {

      console.log(
        "Accept Booking Error:",
        error
      );

      res.status(500).json({

        message: error.message,

      });

    }

  }
);


// ==========================================
// COMPLETE BOOKING
// PUT /api/bookings/complete/:id
// ==========================================

router.put(
  "/complete/:id",
  async (req, res) => {

    try {

      const booking =
        await Booking.findByIdAndUpdate(

          req.params.id,

          {
            status: "Completed",
          },

          {
            new: true,
          }

        );

      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found",

        });

      }

      res.status(200).json({

        message:
          "Booking Completed",

        booking,

      });

    } catch (error) {

      console.log(
        "Complete Booking Error:",
        error
      );

      res.status(500).json({

        message: error.message,

      });

    }

  }
);


module.exports = router;