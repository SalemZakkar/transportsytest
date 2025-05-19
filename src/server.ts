import app from "./index";
import {connect} from "./db";
import {initializeApp} from "firebase/app";
import https from "https";
connect().then(() => {
    console.log("Mongo Connected")
});

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


setInterval(() => {
    https.get('https://www.google.com', (res) => {
        console.log(`Status Code: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Error: ${e.message}`);
    });
}, 20000);
app.listen(process.env.PORT, () => {
    console.log("Server started")
})

