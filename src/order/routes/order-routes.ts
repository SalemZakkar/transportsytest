import express from "express";
import {permissionMiddleware} from "../../core/middleware/permission-middleware";
import {Subjects} from "../../core/abilities/subjects";
import {Actions} from "../../core/abilities/actions";
import {validatorMiddleware} from "../../core/middleware/validator-middleware";
import {createOrderValidator, getOrdersValidator} from "../validator/order-validator";
import {createOrder, getOrder} from "../controller/order_controller";


const orderRoutes = express.Router()


orderRoutes.route('/',)
    .post(
        permissionMiddleware(Actions.write, Subjects.order),
        validatorMiddleware(createOrderValidator), createOrder)
    .get(
        validatorMiddleware(getOrdersValidator, true),
        getOrder,
    );


export default orderRoutes;
