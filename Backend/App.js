const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/AuthRoutes'));

app.listen(5000, () => {
    console.log('Server started at port',5000);
  });