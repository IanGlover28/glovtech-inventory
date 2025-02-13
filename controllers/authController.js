require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // ✅ Ensure correct path to models
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password_hash: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error in register route:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('Error in login route:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
