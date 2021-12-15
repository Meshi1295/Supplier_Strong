const express = require('express');
const db = require('./modules/db');
const env = require('dotenv');
const cors = require('cors');
const app = express();
const multer = require('multer')
const path = require('path');
const upload = multer({ dest: "uploads/" })

env.config()

// ---- middleware ---- //
app.use(express.json())
app.use(cors());
// app.use('/uploads', exp.static(path.join(__dirname, '/uploads')));


app.get('/allCustomer', (req, res) => {
    return db.getCustomers()
        .then(customer => res.send(customer))
        .catch(e => console.log(e))
})


app.post('/setCustomer', (req, res) => {
    const { profileImg } = req.body
    db.setNewCustomer(req.body)
        .then(customer => res.json(customer))
        .catch(err => res.json({ mes: err }))
})

// app.post('/uploadFile', upload.single('avatar'), (req, res) => {
//     let fileType = req.file

//     res.send('200')

// })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);

//         const fileName = Date.now() + path.extname(file.originalname)

//         cb(null, fileName);
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// const upload = multer({ storage: storage, fileFilter: fileFilter });
// app.post('/upload', upload.single('image'), (req, res, next) => {
//     try {
//         return res.status(201).json({
//             message: 'File uploded successfully'
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });



app.listen(process.env.LOCAL, () => {
    console.log(`Server started on port http://localhost:${process.env.LOCAL}`);
})


