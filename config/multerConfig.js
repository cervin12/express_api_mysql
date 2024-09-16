const moment = require('moment/moment');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store in 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp and original name
    cb(null, String(moment().format('DD,MM,YY,hh,mm,ss'))+ '-' + file.originalname);
  }
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }


};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;