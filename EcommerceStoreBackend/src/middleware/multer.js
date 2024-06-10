// Configure Multer for file upload
const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  //dev pulse studio
  const upload = multer({ storage: storage });

  module.exports = upload;