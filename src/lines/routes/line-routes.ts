import express from "express";
import {validatorMiddleware} from "../../core/middleware/validator-middleware";
import {createLine, deleteLine, getLineByCriteria, updateLine} from "../controller/line-controller";
import {createLineValidator, getLineValidator, updateLineValidator} from "../validator/lines-validator";
import {permissionMiddleware} from "../../core/middleware/permission-middleware";
import {Subjects} from "../../core/abilities/subjects";
import {Actions} from "../../core/abilities/actions";

let lineRoutes = express.Router();
lineRoutes.route("/").all(permissionMiddleware(Actions.manage, Subjects.lines));
lineRoutes.route("/:id").all(permissionMiddleware(Actions.manage, Subjects.lines));
lineRoutes.route("/").get(validatorMiddleware(getLineValidator, true), getLineByCriteria);
lineRoutes.route("/:id").delete(deleteLine);
lineRoutes.route("/:id").patch(validatorMiddleware(updateLineValidator), updateLine);
lineRoutes.route("/").post(validatorMiddleware(createLineValidator), createLine);

export default lineRoutes;