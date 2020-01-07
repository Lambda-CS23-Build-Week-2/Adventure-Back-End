const express = require('express');

const Rooms = require('../models/rooms-model');

const router = express.Router();

router.post('/rooms/', async (req, res) => {
    console.log('well create a new room here');
});