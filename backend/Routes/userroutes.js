import express from 'express';
import { registeruser,authuser } from '../Controllers/usercontrol.js';

export const router = express.Router();

router.route('/').post(registeruser)

router.post('/login',authuser)
