const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

module.exports = cloudinary;
