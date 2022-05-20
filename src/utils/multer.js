const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../uploads/');
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== 'jpeg' && ext !== '.png') {
      cb(new Error('Unsupported File Format', false));
      return;
    }
    cb(null, true);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});
