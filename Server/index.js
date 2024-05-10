import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import productRoutes from "./routes/products.js"

const app = express();
const port = 5000;
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

app.use("/", productRoutes)

app.get( "/", (req, res) => {res.send( "Hello World!" );});


app.all("*", (req,res)=>{
    res.send("Route does not exist")}
)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});