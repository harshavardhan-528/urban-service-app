import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      role: "customer",

    });

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [verified, setVerified] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  // SEND OTP
  const sendOTP = async () => {

    try {

      await axios.post(

        "https://urban-service-app-r3ee.onrender.com/api/otp/send-otp",

        {
          email: formData.email,
        }

      );

      alert("OTP Sent");

      setOtpSent(true);

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };


  // VERIFY OTP
  const verifyOTP = async () => {

    try {

      await axios.post(

        "https://urban-service-app-r3ee.onrender.com/api/otp/verify-otp",

        {
          otp,
        }

      );

      alert("OTP Verified");

      setVerified(true);

    } catch (error) {

      alert("Invalid OTP");

    }

  };


  // REGISTER
  const handleRegister = async (e) => {

    e.preventDefault();

    if (!verified) {

      return alert(
        "Please verify OTP first"
      );

    }

    try {

      await axios.post(

        "https://urban-service-app-r3ee.onrender.com/api/auth/register",

        formData

      );

      alert(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };


  return (

    <div>

      <Navbar />

      <div className="container">

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Register
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"

            name="name"

            placeholder="Enter Name"

            onChange={handleChange}

            required
          />

          <br /><br />

          <input
            type="email"

            name="email"

            placeholder="Enter Email"

            onChange={handleChange}

            required
          />

          <br /><br />

          <button
            type="button"
            onClick={sendOTP}
          >
            Send OTP
          </button>

          <br /><br />

          {
            otpSent && (

              <>

                <input
                  type="text"

                  placeholder="Enter OTP"

                  value={otp}

                  onChange={(e) =>
                    setOtp(
                      e.target.value
                    )
                  }
                />

                <br /><br />

                <button
                  type="button"
                  onClick={verifyOTP}
                >
                  Verify OTP
                </button>

                <br /><br />

              </>

            )
          }

          {
            verified && (

              <p
                style={{
                  color: "green",

                  fontWeight: "bold",
                }}
              >
                OTP Verified Successfully
              </p>

            )
          }

          <br />

          <div
            style={{
              position: "relative",
            }}
          >

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              name="password"

              placeholder="Enter Password"

              onChange={handleChange}

              required
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }

              style={{
                position: "absolute",

                right: "15px",

                top: "20px",

                cursor: "pointer",

                color: "#2563eb",

                fontWeight: "bold",
              }}
            >
              {
                showPassword
                  ? "Hide"
                  : "Show"
              }
            </span>

          </div>

          <br /><br />

          <select
            name="role"
            onChange={handleChange}
          >

            <option value="customer">
              Customer
            </option>

            <option value="vendor">
              Vendor
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <br /><br />

          <button type="submit">

            Register

          </button>

          <br /><br />

          <p
            style={{
              textAlign: "center",
            }}
          >
            Already have an account?

            {" "}

            <Link to="/login">

              Login

            </Link>

          </p>

        </form>

      </div>

    </div>

  );
}

export default Register;