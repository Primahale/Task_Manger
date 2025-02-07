import { useState } from "react";
import { createTask } from "../api";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("All fields required");

    const newTask = await createTask({ title, description, status: "pending" });
    if (newTask) {
      onTaskCreated(newTask);
      setTitle("");
      setDescription("");
      alert("Task Added Successfully")
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 3, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Add New Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
