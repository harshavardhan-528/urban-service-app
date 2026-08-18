import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "https://urban-service-app-r3ee.onrender.com/api/auth/login",

        {
          email,
          password,
        }

      );

      localStorage.setItem(

        "token",

        res.data.token

      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )

      );

      alert("Login Successful");

      navigate("/Home");

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
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            required
          />

          <br /><br />

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

              placeholder="Enter Password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

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

          <button type="submit">

            Login

          </button>

          <br /><br />

          <p
            style={{
              textAlign: "center",
            }}
          >
            Don’t have an account?

            {" "}

            <Link to="/register">

              Register

            </Link>

          </p>

        </form>

      </div>

    </div>

  );
}

export default Login;