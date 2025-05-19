import express from "express";
import {createAccount, login} from "../controller/auth-controller";
import {validatorMiddleware} from "../../core/middleware/validator-middleware";
import {createAccountValidator, signInAccountValidator} from "../validators/auth-validator";
// import {sendOtp} from "../controller/auth-controller";

let authRouter = express.Router();

authRouter.route('/signUp').post(validatorMiddleware(createAccountValidator), createAccount);
authRouter.route('/signIn').post(validatorMiddleware(signInAccountValidator), login);


export default authRouter