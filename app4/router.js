import express from 'express';
import userController from './controllers/userController.js';

const router = express.Router()

console.log('router');
router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
