const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Game",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"],
  },
});

const upload = multer({storage: storage});
module.exports = {upload};