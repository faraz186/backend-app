import express from "express";
import mongoose from "mongoose";
import { userModel } from "./model/userSchema.js";
import chalk from "chalk";
const app = express();
const PORT = 5000;

app.use(express.json());

const MONGODB_URI = `mongodb+srv://admin:admin@cluster0.ur9er0t.mongodb.net/`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(chalk.bgCyan.bold("mongodb connect successfully..."));
  })
  .catch((err) => {
    console.log(err);
  });

// user api's

app.get("/api/getusers", async (req, res) => {
  const getData = await userModel.find();

  res.json({
    message: "get user data successfully...",
    getData,
  });
});

app.post("/api/createuser", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.json({
      message: "Required fields are missing..",
      status: false,
    });
  }

  const userObj = {
    name,
    email,
    password,
  };

  //   create user on database

  const createData = await userModel.create(userObj);

  res.json({
    message: "user create successfully..",
    data: createData,
  });
});

app.put("/api/updateuser", async (req, res) => {
  const body = req.body;

  const updateData = await userModel.findByIdAndUpdate(
    "68c194584fa0a225841ee994",
    body
  );

  res.json({
    message: "user updated",
    updateData,
  });
});

app.delete("/api/deleteuser/:id", async (req, res) => {
  const params = req.params.id;

  const deleteData = await userModel.findByIdAndDelete(params);

  res.json({
    message: "user delete successfully...",
  });
});

app.get("/", (req, res) => {
  res.send("server is now running");
});

// chalk

// create server

app.listen(PORT, () => {
  console.log(
    chalk.bgGrey.bold(`server is running on http://localhost:${PORT}`)
  );
});
