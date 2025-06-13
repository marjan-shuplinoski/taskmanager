import { Router } from 'express';
import { register, login } from './controllers/authController.js';

const router = Router();

// Auth endpoints
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', (req, res) => res.send('logout'));
router.get('/auth/me', (req, res) => res.send('me'));
router.put('/auth/updateprofile', (req, res) => res.send('updateprofile'));

// Tasks endpoints
router.get('/tasks', (req, res) => res.send('get all tasks'));
router.get('/tasks/:id', (req, res) => res.send('get task by id'));
router.post('/tasks', (req, res) => res.send('create task'));
router.put('/tasks/:id', (req, res) => res.send('update task'));
router.delete('/tasks/:id', (req, res) => res.send('delete task'));
router.patch('/tasks/:id/status', (req, res) => res.send('update task status'));

// Categories endpoints
router.get('/categories', (req, res) => res.send('get all categories'));
router.post('/categories', (req, res) => res.send('create category'));
router.put('/categories/:id', (req, res) => res.send('update category'));
router.delete('/categories/:id', (req, res) => res.send('delete category'));

export default router;
