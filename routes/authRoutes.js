import express from 'express';
import { register, login } from '../controllers/authController.js';
import '../docs/authDocs.js'; // Import Swagger documentation

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
