import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { usersRouter } from "../routes/usersRoute.js";
import { recipesRouter } from "../routes/recipes.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
    "mongodb+srv://admin:admin123@recipes.e2593pz.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})

