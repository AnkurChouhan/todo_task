const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// To (GET /) Request
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    const alert = req.query.alert; // fetch alert from query
    res.render('index', { tasks, alert });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// For (POST /add) Request
router.post('/add', async (req, res) => {
  const { title, priority } = req.body;

  if (!title.trim()) {
    return res.redirect('/?alert=' + encodeURIComponent('Please enter a task title.'));
  }

  try {
    await Task.create({ title, priority });
    res.redirect('/?alert=' + encodeURIComponent('Task added successfully.'));
  } catch (err) {
    res.redirect('/?alert=' + encodeURIComponent('Error adding task.'));
  }
});

// For the update task (PUT /:id) to get Request
router.put('/:id', async (req, res) => {
  const { title, priority } = req.body;

  if (!title.trim()) {
    return res.redirect('/?alert=' + encodeURIComponent('Task title cannot be empty.'));
  }

  try {
    await Task.findByIdAndUpdate(req.params.id, { title, priority });
    res.redirect('/?alert=' + encodeURIComponent('Task updated successfully.'));
  } catch (err) {
    res.redirect('/?alert=' + encodeURIComponent('Error updating task.'));
  }
});

// Request for the task (DELETE /:id)
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/?alert=' + encodeURIComponent('Task deleted successfully.'));
  } catch (err) {
    res.redirect('/?alert=' + encodeURIComponent('Error deleting task.'));
  }
});

module.exports = router;
