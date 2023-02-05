import express from 'express';
import userController from './controllers/userController.js';

const router = express.Router()

router.get('/', userController.home);
router.post('/register', userController.register);

export default router;
