import express from "express";
import {getMine, getUsers} from "../controller/user_controller";

const userRoutes = express.Router()


userRoutes.route('mine').get(getMine);

userRoutes.route('users' , ).get(getUsers);

export default userRoutes
