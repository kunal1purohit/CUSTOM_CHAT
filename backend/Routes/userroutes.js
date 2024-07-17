import express from 'express';
import { registeruser } from '../Controllers/usercontrol.js';

export const router = express.Router();

router.route('/').post(registeruser)

// router.post('/login',authuser)
