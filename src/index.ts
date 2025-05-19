import express from "express";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyAyaavMUKnjS6N9Kr3qW2NYGyBIEjXEXEs",
    authDomain: "transortsytest.firebaseapp.com",
    projectId: "transortsytest",
    storageBucket: "transortsytest.firebasestorage.app",
    messagingSenderId: "671799075941",
    appId: "1:671799075941:web:d7b7c9fe4f92f281bfd28c",
    measurementId: "G-H01XBC79KG"
};
initializeApp(firebaseConfig)
let app = express();
import {config} from "dotenv";
import qs from "qs";
import {errorHandlerMiddleWare} from "./core/middleware/errorMiddleware";
import userRoutes from "./user/routes/user-routes";
import authRoutes from "./auth/routes/auth-route";

config()

app.use(express.json());

app.set('query parser', (str: string) => qs.parse(str));

app.use((req,res,next) =>{
    console.log(req.method,req.hostname, req.path,);
    next();
});

app.use('/api/users' , userRoutes);

app.use('/api/auth' , authRoutes);

app.use(errorHandlerMiddleWare)

export default app;