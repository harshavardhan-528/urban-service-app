import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function BookService() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({

    serviceName: "",

    address: "",

    date: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "http://localhost:5000/api/bookings",

        {

          ...formData,

          customerId: user._id,

        }

      );

      alert("Service Booked Successfully");

      navigate("/my-bookings");

    } catch (error) {

      alert(error.message);

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
          Book a Service
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="serviceName"
            placeholder="Enter Service Name"
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
          />

          <br /><br />

          <button type="submit">

            Book Now

          </button>

        </form>

      </div>

    </div>

  );
}

export default BookService;