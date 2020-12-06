const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname)
  }
})

const upload = multer({ 
  storage: storage ,
  limits: {
    fileSize: 1000000
},
fileFilter: function(_req, file, cb){
    checkFileType(file, cb);
}
})
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = {
  uploadMulter: upload
}