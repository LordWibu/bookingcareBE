import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();


let app = express();
app.use(cors({ origin: true }));


// app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//Port == underfield => Port = 6969;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})
