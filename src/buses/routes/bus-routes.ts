import express from "express";
import {
    createBus,
    deleteBus,
    getBuses,
    updateBus,

} from "../controller/bus_controller";
import {permissionMiddleware} from "../../core/middleware/permission-middleware";
import {Subjects} from "../../core/abilities/subjects";
import {Actions} from "../../core/abilities/actions";
import {createBusValidator, getBusValidator, updateBusValidator} from "../validator/bus-validator";
import {validatorMiddleware} from "../../core/middleware/validator-middleware";

const busRoutes = express.Router()


busRoutes.route('/',)
    .all(permissionMiddleware(Actions.manage, Subjects.buses))
    .post(
        validatorMiddleware(createBusValidator), createBus)
    .get(
        validatorMiddleware(getBusValidator, true),
        getBuses,
    );

busRoutes.route('/:id')
    .all(permissionMiddleware(Actions.manage, Subjects.buses))
    .delete(deleteBus)
    .patch(validatorMiddleware(updateBusValidator), updateBus,);


export default busRoutes;
