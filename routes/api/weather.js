const express = require('express');
const route = express.Router();
const data = require('../../data');

// Get all data .
route.get('/', (req, res) => res.json(data));

// Post new data.
route.post('/', (req, res) => {
  const newDate = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  };

  if (!newDate.temperature || !newDate.date || !newDate.userResponse) {
    return res
      .status(401)
      .json({ msg: 'Please enter temp,date and userProject' });
  }
  res.json(newDate);
});

module.exports = route;
