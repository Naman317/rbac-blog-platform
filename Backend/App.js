const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB=require('./DB/db')
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/blog', require('./routes/BlogRoutes'));

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
});