import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/bookings"
      );

      const myBookings =
        res.data.filter(

          (booking) =>
            booking.customerId ===
            user._id

        );

      setBookings(myBookings);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <Navbar />

      <div className="container">

        <h1
          style={{
            marginBottom: "30px",
          }}
        >
          My Bookings
        </h1>

        {
          bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking._id}
            >

              <h2>
                {booking.serviceName}
              </h2>

              <br />

              <p>
                Address:
                {booking.address}
              </p>

              <p>
                Date:
                {booking.date}
              </p>

              <br />

              <div
                className={`status ${booking.status.toLowerCase()}`}
              >
                {booking.status}
              </div>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default MyBookings;