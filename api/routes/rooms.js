const express = require('express');

const Rooms = require('../models/rooms-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const rooms = await Rooms.getAllRooms();
        let newRooms = await rooms.map( (item, i) => {
            let newArr = {"room_id": item.room_id, "type": item.type}
            let dir = {
                "north": item.north,
                "south": item.south,
                "east": item.east,
                "west": item.west
            }
            for(direct in dir) {
                if( item[direct] !== -2) {
                    newArr['dir'] = { [direct]: item[direct], ...newArr['dir'] }
                }
            }
            return newArr
        })
        res.status(200).json(newRooms)
    }
    catch (err) {
        res.status(500).json({ message: "Failed to retrieve Rooms." });
    }
});

router.post('/', async (req, res) => {
    // console.log('well create a new room here', req.body);
    try {
        let doesExist = await Rooms.getRoomByID(req.body.room_id);
        if (doesExist.length > 0) {
            res.status(304).json({})
            return;
        }
        const room = await Rooms.addRoom(req.body);
        console.log('room',room)
        if(room) {
            res.status(201).json({})
        } else {
            res.status(500).json({ message: "error adding room to database."})
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error trying to add room.' })
    }
});

router.post('/directions', async (req, res) => {
    // console.log(req)
    try {
        const dir = await Rooms.getDirections(req.body.room_id);
        if(dir.length === 0) {
            res.status(404).json( { message: 'Room directions not found.' } )
        }
        let newDir = await dir.map( item => {
            console.log('item',item)
            let newItem = {}
            for(d in item) {
                if(item[d] !== -2) {
                    newItem[d] = item[d]
                }
            }
            return newItem
        } )
        res.status(200).json(newDir[0])
    }
    catch (err) {
        res.status(500).json( { message: "Failed to retrieve Directions." } )
    }
});

router.post('/directions/update', async (req, res) => {
    try {
        const directions = await Rooms.updateDirection(req.body)
        res.status(204).json({})
    }
    catch (err) {
        res.status(500).json({ message: "Error updating direction."})
    }
});

module.exports = router;