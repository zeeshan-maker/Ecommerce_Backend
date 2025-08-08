const multer = require("multer");

const storage = multer.memoryStorage(); // we will upload buffer to Cloudinary

const upload = multer({ storage });

module.exports = upload;
