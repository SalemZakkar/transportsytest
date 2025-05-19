import express from "express";
import {getMine, getUsers} from "../controller/user_controller";
import {authMiddleware} from "../../core/middleware/auth-middleware";

const userRoutes = express.Router()


userRoutes.route('/mine').get(getMine);

// userRoutes.route('users' , ).get(getUsers);

export default userRoutes
