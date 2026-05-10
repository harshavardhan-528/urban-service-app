import Navbar from "../components/Navbar";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div>

      <Navbar />

      <div className="dashboard">

        <h1>
          Dashboard
        </h1>

        <br />

        <div className="card">

          <h2>
            Welcome {user?.name}
          </h2>

          <br />

          <p>
            Role: {user?.role}
          </p>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;