
const express = require("express");
const app = express();
const multer = require("multer");
const cloudinary = require('cloudinary');
app.use(express.json());
require("dotenv").config();
//How to upload a file + text in Node/Express
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const random = Math.ceil(Math.random() * 100);
    let filename = random + "" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });
// How to upload a file in cloudinary
cloudinary.config({
  cloud_name: "anyway",
  api_key: "395862488124532",
  api_secret: "APqfiY3sutO6kPanwr1NMbDAkuo",
});

app.post("/upload", upload.single("file"), (req, res) => {
  // console.log(req.body.name)
  cloudinary.uploader.upload(req.file.path,
    function (error, result) {
      console.log(error,result);
    }
  );
  res.status(200).json({ msg: "file upload successfully" });
});

let port = process.env.port;
app.listen(port, () => {
  console.log("the server is running on the port  " + port);
});
