import express from 'express';

import authentication from './app/middlewares/auth';

import DefaultControllersUsers from './app/controllers/DefaultControllers';
import {
  GetTasks,
  SetTasks,
  UpdateTasks,
  DeleteTasks,
} from './app/controllers/Tasks';

const router = express.Router();

//default
router.get('/', authentication, DefaultControllersUsers);

//tasks
router.get('/tasks', authentication, GetTasks);
router.post('/tasks', authentication, SetTasks);
router.put('/tasks/:id', authentication, UpdateTasks);
router.patch('/tasks/:id', authentication, UpdateTasks);
router.delete('/tasks/:id', authentication, DeleteTasks);

export default router;
