import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function AdminDashboard() {

  const [users, setUsers] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    fetchUsers();

    fetchBookings();

  }, []);

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/auth/users"
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

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

  return (

    <div>

      <Navbar />

      <div className="container">

        <h1
          style={{
            marginBottom: "30px",
          }}
        >
          Admin Dashboard
        </h1>

        <h2>
          Users
        </h2>

        <br />

        {
          users.map((user) => (

            <div
              className="booking-card"
              key={user._id}
            >

              <h3>
                {user.name}
              </h3>

              <p>
                {user.email}
              </p>

              <p>
                Role:
                {user.role}
              </p>

            </div>

          ))
        }

        <br /><br />

        <h2>
          Bookings
        </h2>

        <br />

        {
          bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking._id}
            >

              <h3>
                {booking.serviceName}
              </h3>

              <p>
                {booking.address}
              </p>

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

export default AdminDashboard;