const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes'); // ✅ Ensure correct path
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json()); // ✅ This allows JSON request bodies

// API Routes
app.use('/api/v1/auth', authRoutes); // ✅ Mount the auth routes


app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
  });

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected...');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
});
