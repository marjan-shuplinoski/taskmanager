import { Request, Response } from 'express';
import Joi from 'joi';
import Task from '../models/Task';

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('').max(1000),
  status: Joi.string().valid('todo', 'in-progress', 'done').default('todo'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  category: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  tags: Joi.array().items(Joi.string().max(30)).optional(),
});

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const tasks = await Task.find({ user: req.user._id })
      .sort(sort as string)
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const count = await Task.countDocuments({ user: req.user._id });
    res.json({ tasks, count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const statusSchema = Joi.object({ status: Joi.string().valid('todo', 'in-progress', 'done').required() });
  const { error } = statusSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: req.body.status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
