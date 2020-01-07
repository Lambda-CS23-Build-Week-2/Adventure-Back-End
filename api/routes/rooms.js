const express = require('express');

const Rooms = require('../models/rooms-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const rooms = await Rooms.getAllRooms();
        res.status(200).json(rooms)
    }
    catch (err) {
        res.status(500).json({ message: "Failed to retrieve Rooms " });
    }
});

router.post('/', async (req, res) => {
    console.log('well create a new room here');
});

module.exports = router;