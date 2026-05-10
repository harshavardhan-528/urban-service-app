import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="navbar">

      <h2
        style={{
          cursor: "pointer",
        }}
        onClick={() =>
          navigate("/")
        }
      >
        Urban Services
      </h2>

      <div className="nav-links">

        {
          user && (

            <>
              <button
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Dashboard
              </button>

              <button
                onClick={() =>
                  navigate("/my-bookings")
                }
              >
                My Bookings
              </button>

              {
                user.role ===
                "vendor" && (

                  <button
                    onClick={() =>
                      navigate(
                        "/vendor-dashboard"
                      )
                    }
                  >
                    Vendor
                  </button>

                )
              }

              {
                user.role ===
                "admin" && (

                  <button
                    onClick={() =>
                      navigate(
                        "/admin-dashboard"
                      )
                    }
                  >
                    Admin
                  </button>

                )
              }

              <button
                onClick={handleLogout}
              >
                Logout
              </button>
            </>

          )
        }

        {
          !user && (

            <>
              <button
                onClick={() =>
                  navigate("/login")
                }
              >
                Login
              </button>

              <button
                onClick={() =>
                  navigate("/register")
                }
              >
                Register
              </button>
            </>

          )
        }

      </div>

    </div>

  );
}

export default Navbar;