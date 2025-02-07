import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "../component/TaskForm";
import TaskList from "../component/TaskList";
import { fetchTasks } from "../api"; // Import API function
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]); // Update state instead of reloading
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navbar Section */}
      <header style={styles.navbar}>
        <h2 style={styles.logo}>Task Manager</h2>
        <nav>
          <span style={styles.welcome}>Welcome, {user?.name || "User"}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </nav>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    padding: "20px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    color: "white",
    borderRadius: "5px",
  },
  logo: {
    margin: 0,
  },
  welcome: {
    marginRight: "15px",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
  },
  mainContent: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
};

  

export default Home;
