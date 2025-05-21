import express from "express";
import {createUser, deleteUser, getMine, getUsers, updateUser} from "../controller/user_controller";
import {authMiddleware} from "../../core/middleware/auth-middleware";
import {permissionMiddleware} from "../../core/middleware/permission-middleware";
import {Subjects} from "../../core/abilities/subjects";
import {Actions} from "../../core/abilities/actions";
import {createUserValidator, getUsersValidator, updateUserValidator} from "../validator/user-validator";
import {validatorMiddleware} from "../../core/middleware/validator-middleware";

const userRoutes = express.Router()


userRoutes.route('/mine').get(getMine);
userRoutes.route('/',)
    .all(permissionMiddleware(Actions.manage, Subjects.users))
    .post(
        validatorMiddleware(createUserValidator), createUser)
    .get(
        validatorMiddleware(getUsersValidator,true),
        getUsers,
    );

userRoutes.route('/:id')
    .all(permissionMiddleware(Actions.manage, Subjects.users))
    .delete(deleteUser)
    .patch(validatorMiddleware(updateUserValidator), updateUser,);


export default userRoutes
