import { Request } from "express";
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (_req:Request, _file:File, cb:any) {
    cb(null, "public/images");
  },
  filename: function (_req:Request, file:any, cb:any) {
    cb(null, "" + Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });
module.exports=upload
