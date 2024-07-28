import express from 'express';
import { registeruser,authuser ,allusers} from '../Controllers/usercontrol.js';
import { protect } from '../middle/authmiddle.js';

export const router = express.Router();

router.route('/').post(registeruser).get(protect,allusers)

router.post('/login',authuser)
