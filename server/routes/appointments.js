const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Notice the ../

router.post('/book', async (req, res) => {
  try {
    const { userId, serviceName, date, timeSlot } = req.body;
    const existing = await Appointment.findOne({ date, timeSlot });
    if (existing) return res.status(400).json({ msg: "Slot taken" });

    const newAppt = new Appointment({ customer: userId, serviceName, date, timeSlot });
    await newAppt.save();
    res.status(201).json({ msg: "Booked!", newAppt });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get ('/all', async(req, res)=> {
  try{
    const appointments = await Appointment.find().populate('customer', 'name email')
    res.json(appointments)
  }
  catch(err){
    res.status(500).json({error: err.message})
  }
})
module.exports = router;