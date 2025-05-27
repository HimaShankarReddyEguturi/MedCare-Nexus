const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Patient = require('./models/patient');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle patient registration
app.post('/register', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ success: true, message: 'File uploaded successfully' });
    } else {
        res.json({ success: false, message: 'File upload failed' });
    }
});

// Route to get patient data
app.get('/patients', (req, res) => {
    Patient.find({}, (err, patients) => {
        if (err) {
            res.status(500).send('Error retrieving patient data');
        } else {
            res.json({ patients: patients });
        }
    });
});

// Start server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
