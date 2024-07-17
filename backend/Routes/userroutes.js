import express from 'express';
import { registeruser,authuser ,allusers} from '../Controllers/usercontrol.js';

export const router = express.Router();

router.route('/').post(registeruser).get(allusers)

router.post('/login',authuser)
