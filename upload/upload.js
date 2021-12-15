const exp = require('express');
const path = require('path');
const multer = require('multer');

const app = exp();
const port = 9000;

app.use('/', exp.static(path.join(__dirname, '/public')));
app.use('/uploads', exp.static(path.join(__dirname, '/uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log(Date.now() + path.extname(file.originalname));

        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Hello world app listening on port ${port}!`)
});
