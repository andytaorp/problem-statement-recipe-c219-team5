// server.js - Main Backend Entry
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const multer = require("multer");
const axios = require('axios');

//sigma
    

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/api/ai', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No image file uploaded');
    }

    console.log("Uploaded file: ", req.file);  // Log file details for debugging
    const formData = new FormData();
    formData.append('image', req.file.path);

    const response = await axios.post('https://api.logmeal.com/v2/image/segmentation/complete', formData, {
      headers: {
        'Authorization': 'Bearer ' + process.env.LOGMEAL_API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error during Logmeal API call:', error);
    res.status(500).send('Error processing image');
  }
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use(router);


const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log("Connected to DB & listening on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
