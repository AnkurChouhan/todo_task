const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect('mongodb+srv://ankurchouhanofficial:Txc1xnhu5ktZFnWz@cluster777.i70wgbx.mongodb.net/', {
      // no options needed as of Mongoose 6+
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
})();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from /public (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Override HTTP methods for PUT and DELETE in forms (_method query param)
app.use(methodOverride('_method'));

// Use the taskRoutes for root path
app.use('/', taskRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

// Start the server for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
