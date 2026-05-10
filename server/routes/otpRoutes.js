const express = require("express");

const nodemailer = require("nodemailer");

const router = express.Router();

let generatedOTP = "";


router.post("/send-otp", async (req, res) => {

  try {

    const { email } = req.body;

    generatedOTP = Math.floor(

      100000 + Math.random() * 900000

    ).toString();

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,

        },

      });

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Urban Services OTP",

      text:
        `Your OTP is ${generatedOTP}`,

    });

    res.status(200).json({

      message: "OTP Sent",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });

  }

});


router.post("/verify-otp", (req, res) => {

  const { otp } = req.body;

  if (otp === generatedOTP) {

    return res.status(200).json({

      message:
        "OTP Verified",

    });

  }

  res.status(400).json({

    message: "Invalid OTP",

  });

});


module.exports = router;