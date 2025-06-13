import User from '../models/User.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already in use' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      message: 'Registration successful',
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err && err.message && err.message.match(/failed to connect|ECONNREFUSED|MongoNetworkError|topology was destroyed|not connected/i)) {
      return res.status(503).json({ message: 'MongoDB not connected' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
