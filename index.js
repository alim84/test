const express = require("express");
const mongoose = require("mongoose");
const textModel = require("./models/text.Model");
const app = express();
const PORT = 4000;
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testing");
    console.log("Databse Connected");
  } catch (error) {
    console.log("Database is Broken");
    process.exit(1);
  }
};
app.post("/createdata", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).send({ message: "Text field is required" });
    }

    const textModel = new textModel({
      text,
    });

    await textModel.save();
    res.status(201).send({ message: "Data Inserted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hey, how r you" });
});

app.listen(PORT, async (req, res) => {
  console.log(`Server is running http://localhost:${PORT}`);
  await connectDB();
});
