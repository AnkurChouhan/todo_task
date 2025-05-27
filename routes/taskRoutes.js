// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', { tasks });
});

router.post('/add', async (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.send("<script>alert('Please enter a task title.'); window.location='/';</script>");

  await Task.create({ title, priority });
  res.send("<script>alert('Task added successfully.'); window.location='/';</script>");
});

router.post('/edit/:id', async (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.send("<script>alert('Task title cannot be empty.'); window.location='/';</script>");

  await Task.findByIdAndUpdate(req.params.id, { title, priority });
  res.send("<script>alert('Task updated successfully.'); window.location='/';</script>");
});

router.post('/delete/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("<script>alert('Task deleted successfully.'); window.location='/';</script>");
});

module.exports = router;
