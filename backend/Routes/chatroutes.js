import express from 'express';
import { protect } from '../middle/authmiddle.js';
import { accesschat,fetchchats,creategroupchat ,renamegroup, addtogroup, removefromgroup} from '../Controllers/chatcontrol.js';

export const router = express.Router();

router.route("/").post(protect,accesschat);
router.route("/").get(protect,fetchchats);

router.route("/group").post(protect,creategroupchat);
router.route("/rename").put(protect,renamegroup);
router.route("/groupremove").put(protect,removefromgroup);
router.route("/groupadd").put(protect,addtogroup);


