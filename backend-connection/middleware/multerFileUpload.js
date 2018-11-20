const multer = require('multer');
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'  ||
      file.mimetype === 'image/jpg'  ||
      file.mimetype === 'image/gif'  ||
      file.mimetype === 'audio/mp3' ||
      file.mimetype === 'audio/wav' ||
      file.mimetype ==='audio/ogg')
  {
      cb(null, true);
  } else {
      cb(null, false);
  }
};

//multer setting
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './backend-connection/routes/toefl/registerExam/uploads');
  },
  filename: function(req, file, cb) {
      cb(null, 'NO.'+req.params.toeflNo+'.'+(new Date()).toISOString()+file.originalname);
  }
});

module.exports = multer({storage: storage,
                     limits: {
                         fileSize: 1024 * 1024 * 1024 * 1024,
                         fieldSize: 1024 * 1024 * 1024
                     },
                     fileFilter: fileFilter
                  }).array('toeflFiles', 12)
