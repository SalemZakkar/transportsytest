import app from "./index";
import {connect} from "./db";
import https from "https";

connect().then(() => {
    console.log("Mongo Connected")
});


setInterval(() => {
    https.get('https://www.google.com', (res) => {
        console.log(`Status Code: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Error: ${e.message}`);
    });
}, 20000,
    );

app.listen(process.env.PORT, () => {
    console.log("Server started")
})

