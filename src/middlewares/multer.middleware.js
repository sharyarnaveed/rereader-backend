const multer=require("multer")
const {generateNUmber}=require("../utility/generateopt")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
   const uniqueid=generateNUmber()
        cb(null, Date.now() +'-'+uniqueid+'-'+file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedMimeTypes=[
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ]
    
     if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
});

module.exports = {upload};