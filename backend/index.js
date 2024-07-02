import express from "express";
import {PORT,mongodburl} from "./config.js";
import {mongoose} from "mongoose"
import booksRoute from "./routes/bookRoutes.js" 
import cors from 'cors';


const app = express();

//to parse json data from body
app.use(express.json());

//CORS - always above the route
app.use(cors());

/*app.use(
    cors({
    origin : 'http://localhost:5173',
    methods : ['GET','POST','PUT','DELETE'],
    allowedHeaders : ['Contetnt-Type'],
}));
*/

// to route
app.use('/books',booksRoute);


//connection with database
mongoose
    .connect(mongodburl)
    .then(() => {
        console.log('App is connected to database');
        
        app.listen(PORT,() =>{
            console.log(`Listening on port : ${PORT}`)
        })
    })
    .catch((e) => {
        console.log(e);
    })