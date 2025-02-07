const express = require('express');
const { createTask, getTasks, updateTask, deleteTask, taskController } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

router.put("/tasks/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Expecting status: "completed" or "pending"
  
    if (!["completed", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
  
    try {
      const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Error updating task status" });
    }
  });
  


module.exports = router;
