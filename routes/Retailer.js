const mongoose = require('mongoose');
const Admin= require('./Admin');
const SalesAgency= require('./SalesAgency');
const Retailer= require('./Retailer');

RetailerRouter.post('/', async (req, res) => {
    try {
        const admin = await Admin.findById(req.body.Admin); // Assuming 'Admin' model has an id field
        const salesAgency = await SalesAgency.findById(req.body.SalesAgency); // Assuming 'SalesAgency' model has an id field

        if (!admin || !salesAgency) {
            return res.status(400).json({ message: 'Admin or Sales Agency not found' });
        }

        const retailer = await Retailer.create({
            Name: req.body.Name,
            Address: req.body.Address,
            PhoneNumber: req.body.PhoneNumber,
            Email: req.body.Email,
            Admin: admin, // Assign the found admin
            SalesAgency: salesAgency, // Assign the found sales agency
        });

        res.json(retailer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all retailers
RetailerRouter.get('/', async (req, res) => {
    try {
        const retailers = await Retailer.find();
        res.json(retailers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


    


  
    


