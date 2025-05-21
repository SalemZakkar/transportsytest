import express from "express";
let app = express();
import {config} from "dotenv";
import qs from "qs";
import {errorHandlerMiddleWare} from "./core/middleware/errorMiddleware";
import userRoutes from "./user/routes/user-routes";
import authRoutes from "./auth/routes/auth-route";
import {authMiddleware} from "./core/middleware/auth-middleware";
import lineRoutes from "./lines/routes/line-routes";
import busRoutes from "./buses/routes/bus-routes";

config()

app.use(express.json());

app.set('query parser', (str: string) => qs.parse(str));

app.use((req,res,next) =>{
    console.log(req.method,req.hostname, req.path,);
    next();
});

app.use(authMiddleware());
app.use('/api/users' , userRoutes);

app.use('/api/auth' , authRoutes);

app.use('/api/lines' , lineRoutes);

app.use('/api/bus' , busRoutes);

app.use(errorHandlerMiddleWare)

export default app;