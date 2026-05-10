import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function VendorDashboard() {

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

      setBookings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const acceptBooking = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/bookings/accept/${id}`,

        {
          vendorId: user._id,
        }

      );

      alert("Booking Accepted");

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };

  const completeBooking = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/bookings/complete/${id}`

      );

      alert("Booking Completed");

      fetchBookings();

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
          Vendor Dashboard
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

              <br />

              {
                booking.status ===
                "Pending" && (

                  <button
                    onClick={() =>
                      acceptBooking(
                        booking._id
                      )
                    }
                  >
                    Accept
                  </button>

                )
              }

              {
                booking.status ===
                "Accepted" && (

                  <button
                    onClick={() =>
                      completeBooking(
                        booking._id
                      )
                    }
                  >
                    Complete
                  </button>

                )
              }

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default VendorDashboard;