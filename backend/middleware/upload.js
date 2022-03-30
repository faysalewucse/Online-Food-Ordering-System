const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = upload;
// const multer = require("multer");
// const path = require("path");

// const UPLOAD_FOLDER = "../khaudau/public/uploads";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, UPLOAD_FOLDER);
//   },
//   filename: (req, file, cb) => {
//     const fileExt = path.extname(file.originalname);
//     const fileName =
//       file.originalname
//         .replace(fileExt, "")
//         .toLowerCase()
//         .split(" ")
//         .join("-") +
//       "-" +
//       Date.now();

//     cb(null, fileName + fileExt);
//   },
// });

// var uploads = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1000000 * 10, //10MB
//   },
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only .jpg, .png, .jpeg format Allowed"));
//     }
//   },
// });

// module.exports = uploads;
