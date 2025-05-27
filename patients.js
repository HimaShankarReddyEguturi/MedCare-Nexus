const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
    gender: String,
    height: String,
    weight: String,
    address: String,
    mobile: String
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
