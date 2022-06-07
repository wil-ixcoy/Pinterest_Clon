const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${extension}`);
  },
});

const uploadImageHandler = multer({
  storage,
});

const helperImage = (filePath, fileName) => {
  return sharp(filePath).resize({
    width: 300,
    height: 500,
  }).toFile(path.join(__dirname, `../public/optimize/resized-${fileName}`));

};

module.exports = {
  uploadImageHandler,
  helperImage,
};
