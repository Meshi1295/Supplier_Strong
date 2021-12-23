const express = require('express');
const db = require('./modules/db');
const env = require('dotenv');
const cors = require('cors');
const app = express();
const multer = require('multer')
const path = require('path');

env.config()

// ---- middleware ---- //
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log('file', file);
        const fileName = Date.now() + path.extname(file.originalname)
        cb(null, fileName);
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


// --------- customer -----------
app.post('/setCustomer', upload.single('image'), (req, res) => {
    const fileName = req.file ? req.file.filename : null
    try {
        const value = { ...req.body, filename: fileName }

        db.setNewCustomer(value)
            .then(customer => res.json(customer))
            .catch(err => {
                res.json({ mes: err })
            })

    } catch (error) {
        res.json({ mes: error })
    }
})

app.get('/allCustomer', (req, res) => {
    return db.getCustomers()
        .then(customer => res.send(customer))
        .catch(e => console.log(e))
})

app.get('/specificCustomer/:id', (req, res) => {
    console.log('url', req.params.id);
    return db.getSpecificCustomer(req.params.id)
        .then(customer => res.send(customer))
        .catch(e => console.log(e))
})

app.post('/update_customer', upload.single('image'), (req, res) => {
    const fileName = req.file ? req.file.filename : null
    console.log('upload.storage.filename', fileName);
    try {
        const value = { ...req.body, image: fileName }

        db.updateCustomer(value)
            .then(customer => res.json(customer))
            .catch(err => {
                console.log(err);
                res.json({ mes: err })
            })

    } catch (error) {
        console.log(error);
        res.json({ mes: error })
    }
})

app.delete('/deleteCustomer/:id', (req, res) => {
    console.log(req.params.id);
    db.deleteCustomer(req.params.id)
        .then(customer => res.json(customer))
        .catch(e => console.log(e))
})

// --------- product -----------

app.post('/setNewProduct', upload.single('image'), (req, res) => {
    console.log('upload.storage.filename', req.file.filename);

    try {
        const value = { ...req.body, image: req.file.filename }

        db.setNewProduct(value)
            .then(customer => res.json(customer))
            .catch(err => {
                console.log(err);
                res.json({ mes: err })
            })

    } catch (error) {
        console.log(error);
        res.json({ mes: error })
    }
})

app.get('/allProducts', (req, res) => {
    return db.getProducts()
        .then(customer => {
            // console.log(customer);
            res.json(customer)
        })
        .catch(e => console.log(e))
})

app.delete('/deleteProduct/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    db.deleteProduct(req.params.id)
        .then(product => res.json(product))
        .catch(e => console.log(e))
})


app.listen(process.env.LOCAL, () => {
    console.log(`Server started on port http://localhost:${process.env.LOCAL}`);
})


