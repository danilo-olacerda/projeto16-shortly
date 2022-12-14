import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server online at ${process.env.PORT || 4000}`);
})