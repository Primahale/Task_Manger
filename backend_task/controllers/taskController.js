const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
      // Destructure title and description from the request body
      const { title, description } = req.body;

      // Check if both title and description are provided
      if (!title || !description) {
          return res.status(400).json({ message: "Title and description are required" });
      }

      // Create a new task with the provided data
      const newTask = new Task({
          title,
          description,
          user: req.user.id // Assuming req.user.id comes from JWT
      });

      // Save the task to the database
      await newTask.save();

      // Send back the created task
      res.status(201).json(newTask);
  } catch (error) {
      // Log the error for debugging
      console.error("Error creating task:", error);

      // Check for specific types of errors and respond with appropriate status codes
      if (error.name === 'ValidationError') {
          return res.status(400).json({ message: "Validation error", error: error.message });
      }
      
      // General server error
      res.status(500).json({ message: "Server error, please try again later" });
  }
};

exports.getTasks = async (req, res) => {
  try {
      // Fetch tasks for the authenticated user
      const tasks = await Task.find({ user: req.user.id }); // Assuming req.user.id comes from JWT

      if (!tasks || tasks.length === 0) {
          return res.status(404).json({ message: "No tasks found for this user" });
      }

      res.status(200).json(tasks);
  } catch (error) {
      console.error("Error fetching tasks:", error);

      // Check for specific error cases
      if (error.name === 'CastError') {
          return res.status(400).json({ message: "Invalid user ID" });
      }

      // General server error
      res.status(500).json({ message: "Server error, please try again later" });
  }
};

exports.updateTask = async (req, res) => {
  try {
      const { title, description } = req.body; // Assuming you're updating the title and description

      // Find the task by ID
      const task = await Task.findById(req.params.id);

      if (!task) {
          return res.status(404).json({ message: "Task not found" });
      }

      // Ensure the task belongs to the authenticated user
      if (task.user.toString() !== req.user.id) {
          return res.status(403).json({ message: "Not authorized to update this task" });
      }

      // Update task fields
      task.title = title || task.title;
      task.description = description || task.description;

      // Save the updated task
      await task.save();

      res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
      console.error("Error updating task:", error);

      // Specific error handling
      if (error.name === 'CastError') {
          return res.status(400).json({ message: "Invalid task ID format" });
      }

      // General server error
      res.status(500).json({ message: "Server error, please try again later" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
      // Log the incoming task ID
      console.log("Attempting to delete task with ID:", req.params.id);

      // Find the task by ID
      const task = await Task.findById(req.params.id);

      if (!task) {
          console.log("Task not found with ID:", req.params.id);
          return res.status(404).json({ message: "Task not found" });
      }

      // Log the user ID from the token
      console.log("Task owner ID:", task.user);
      console.log("Authenticated user ID:", req.user.id);

      // Ensure the task belongs to the authenticated user
      if (task.user.toString() !== req.user.id) {
          console.log("User not authorized to delete this task");
          return res.status(403).json({ message: "Not authorized to delete this task" });
      }

      // Delete the task
      await Task.findByIdAndDelete(req.params.id);

      // Successful deletion
      console.log("Task deleted successfully");
      res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
      // General server error
      console.error("Internal server error:", error);
      res.status(500).json({ message: "Server error, please try again later" });
  }
};

// exports.updateTaskStatus = (req, res) => {
//     const { taskId } = req.params;  // The task ID is passed as a URL parameter
//     const { status } = req.body;    // Status ('completed' or 'pending') passed in the body

//     if (!status || !['pending', 'completed'].includes(status)) {
//         return res.status(400).json({ message: "Invalid status value. It must be 'pending' or 'completed'." });
//     }

//     Task.findByIdAndUpdate(taskId, { status: status }, { new: true })
//         .then(updatedTask => {
//             if (!updatedTask) {
//                 return res.status(404).json({ message: 'Task not found.' });
//             }
//             res.status(200).json(updatedTask);  // Return the updated task
//         })
//         .catch(error => {
//             console.error('Error updating task status:', error);
//             res.status(500).json({ message: 'Error updating task status.' });
//         });
// };