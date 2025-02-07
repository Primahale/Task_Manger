import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../api";
import { 
  Card, CardContent, Typography, Button, List, ListItem, TextField, IconButton, Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from API
  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Handle delete task
  const handleDelete = async (id) => {
    try {
      if (await deleteTask(id)) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditText(task.title);
  };

  // Handle task update
  const handleUpdate = async () => {
    if (!editingTask) {
      console.error("No task ID found for update.");
      return;
    }

    try {
      const updatedTaskResponse = await updateTask(editingTask, { title: editText });

      if (updatedTaskResponse) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === editingTask ? { ...t, title: updatedTaskResponse.title } : t
          )
        );
      }
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Toggle Task Status
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    try {
      const updatedTask = await updateTask(task._id, { status: newStatus });
      if (updatedTask) {
        setTasks((prevTasks) => 
          prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
        );
      }
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 3, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Task List
        </Typography>
        <List>
          {tasks.map((task) => (
            <ListItem key={task._id} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mb: 2, borderBottom: "1px solid #ddd", pb: 2 }}>
              {editingTask === task._id ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <IconButton color="success" onClick={handleUpdate}>
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setEditingTask(null)}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                  <Typography variant="caption" color={task.status === "pending" ? "warning.main" : "success.main"}>
                    Status: {task.status}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Button 
                      variant="contained" 
                      size="small" 
                      color={task.status === "pending" ? "success" : "warning"} 
                      onClick={() => handleToggleStatus(task)}
                    >
                      Mark as {task.status === "pending" ? "Completed" : "Pending"}
                    </Button>
                    <IconButton color="primary" onClick={() => handleEditClick(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskList;
