import express from "express";
import { register, login, logout, refreshToken } from "../controllers/auth.controller.js";

const router = express.Router();

 router.route('/register').post(register);
 router.route('/login').post(login);
 router.route('/logout').post(logout);
 router.route('/refreshtoken').post(refreshToken);

export default router;