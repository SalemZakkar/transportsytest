import express from "express";
import {validatorMiddleware} from "../../core/middleware/validator-middleware";
import {createLine, deleteLine, getLineByCriteria, updateLine} from "../controller/line-controller";
import {createLineValidator, getLineValidator, updateLineValidator} from "../validator/lines-validator";

let lineRoutes = express.Router();

lineRoutes.route("/").get(validatorMiddleware(getLineValidator, true), getLineByCriteria);
lineRoutes.route("/:id").delete(deleteLine);
lineRoutes.route("/:id").patch(validatorMiddleware(updateLineValidator), updateLine);
lineRoutes.route("/").post(validatorMiddleware(createLineValidator), createLine);

export default lineRoutes;