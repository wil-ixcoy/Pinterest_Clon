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

const helperImage = async (filePath, fileName) => {
 const resize = await sharp(filePath).resize({
    width: 350,
    height: 500,
  }).toFile(path.join(__dirname, `../public/optimize/resized-${fileName}`));
  return{
    resize,
    path: path.join(__dirname, `../public/optimize/resized-${fileName}`),
  }
};

module.exports = {
  uploadImageHandler,
  helperImage,
};
