import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

const API_URL = "http://localhost:5000/api/tasks";

// Setup Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getToken = () => {
    return localStorage.getItem("token"); 
    // return token ? { Authorization: `Bearer ${token}` } : {};
  };

  
  export const fetchTasks = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token available");
  
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks", error.response?.data || error.message);
      throw error;
    }
  };
  

export const getTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error fetching tasks", error.response?.data);
      return [];
    }
  };

  
  
  export const createTask = async (taskData) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token available");
  
      const response = await axios.post(API_URL, taskData, { // ✅ Corrected URL
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error creating task", error.response?.data || error.message);
      throw error;
    }
  };
  
  


  export const updateTask = async (taskId, updatedData) => {
    if (!taskId) {
      console.error("Error: taskId is undefined!"); // Debugging check
      return;
    }
  
    try {
      const token = getToken();
      if (!token) throw new Error("No token available");
  
      const response = await axios.put(`${API_URL}/${taskId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
      throw error;
    }
  };

  export const deleteTask = async (taskId) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token available");
  
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Added token
      });
  
      return true;
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
      return false;
    }
  };
  


export default api;
