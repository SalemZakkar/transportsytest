import express from "express";
import {permissionMiddleware} from "../../core/middleware/permission-middleware";
import {Actions} from "../../core/abilities/actions";
import {Subjects} from "../../core/abilities/subjects";
import {validatorMiddleware} from "../../core/middleware/validator-middleware";
import {getLinks, linkUserToBus, linkUserToLine} from "../controller/link-controller";
import {getLinksValidator, linkUserToBusValidator, linkUserToLineValidator} from "../validator/link-validator";

let linkRoutes = express.Router();

linkRoutes.route("/bus").post(permissionMiddleware(Actions.manage, Subjects.link)
    , validatorMiddleware(linkUserToBusValidator)
    , linkUserToBus,);

linkRoutes.route("/line").post(permissionMiddleware(Actions.manage, Subjects.link)
    , validatorMiddleware(linkUserToLineValidator)
    , linkUserToLine,);

linkRoutes.route("/").get(permissionMiddleware(Actions.manage, Subjects.link)
    , validatorMiddleware(getLinksValidator)
    , getLinks,);

export default linkRoutes;