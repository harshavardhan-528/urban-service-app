import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Home() {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const services = [

    {
      title: "Electrician",

      image:
        "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
    },

    {
      title: "Plumber",

      image:
        "https://cdn-icons-png.flaticon.com/512/3659/3659898.png",
    },

    {
      title: "Cleaning",

      image:
        "https://cdn-icons-png.flaticon.com/512/995/995016.png",
    },

    {
      title: "Salon",

      image:
        "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    },

    {
      title: "Painting",

      image:
        "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
    },

    {
      title: "AC Repair",

      image:
        "https://cdn-icons-png.flaticon.com/512/1046/1046790.png",
    },

  ];

  const filteredServices =
    services.filter((service) =>

      service.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <div>

      <Navbar />

      {/* Hero Banner */}
      <div className="hero-banner">

        <h1>
          Trusted Home Services
        </h1>

        <p>
          Book Electricians,
          Plumbers, Cleaners &
          More
        </p>

        <button
          onClick={() =>
            navigate("/login")
          }
        >
          Get Started
        </button>

      </div>

      {/* Services */}
      <div className="container">

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Our Services
        </h2>

        {/* Search */}
        <div
          style={{
            maxWidth: "400px",
            margin: "auto",
            marginBottom: "40px",
          }}
        >

          <input
            type="text"
            placeholder="Search services..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Grid */}
        <div className="grid">

          {filteredServices.map(
            (service, index) => (

              <div
                className="card"
                key={index}
              >

                <img
                  src={service.image}
                  alt={service.title}
                />

                <h3>
                  {service.title}
                </h3>

                <br />

                <button
                  onClick={() =>
                    navigate(
                      "/book-service"
                    )
                  }
                >
                  Book Now
                </button>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );
}



<footer
  style={{
    background: "#111827",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "50px",
  }}
>

  <p>
    © 2026 Urban Services.
    All Rights Reserved.
  </p>

</footer>

export default Home;