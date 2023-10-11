const multer = require("multer");
const Path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const validExts = [".png", ".jpeg", ".jpg"];

  if (!validExts.includes(Path.extname(file.originalname))) {
    return cb(new Error("Only .png, .jpg, and .jpeg file is alllowed"));
  }

  const fileSize = parseInt(req.headers["content-length"]);

  if (fileSize > 1048576) {
    return cb(new Error("File Size is Big"));
  }

  cb(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  fileSize: 1048576,
});

module.exports = upload.single("productImage");
