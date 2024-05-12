require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const cors = require("cors");
const mainRouter = require('./src/api/routes/main');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

app.use("/api/v1", mainRouter);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000 🤩');
});
