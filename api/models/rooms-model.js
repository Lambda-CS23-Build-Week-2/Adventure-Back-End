const db = require('../config/config');

module.exports = {
    getAllRooms,
    getDirections,
    addRoom,
    getRoomByID,
    updateDirection
}

async function getAllRooms() {
    return await db("rooms AS rm")
            .innerJoin('directions AS dir', 'rm.room_id', 'dir.room_id')
}

async function getRoomByID(room_id) {
    return await db('rooms')
                .where({ room_id })
}

async function getDirections(room_id) {
    return await db("directions AS d")
            .where({ room_id })
            .select('d.north', 'd.south', 'd.east', 'd.west')
}

async function updateDirection(room_info) {
    console.log(room_info)
    return await db('directions AS d')
            .where({ room_id: room_info.room_id })
            .update({ [room_info.direction]: room_info.dir_room_id })
}

async function addRoom(room_info) {
    try {
        console.log('try', room_info)
        await db('rooms')
            .insert({
                room_id: room_info.room_id,
                type: room_info.type
            })
            console.log('rooms')
        await db('directions')
            .insert({
                room_id: room_info.room_id,
                north: room_info.north,
                south: room_info.south,
                east: room_info.east,
                west: room_info.west
            })
            console.log('directions')
        return true
    }
    catch (err) {
        // console.error(err)
        return false
    }
}

/*
{
    "room_id": 0,
    "type": "room",
    "dir": {
        "north": -1,
        "south": -1,
        "east": 0
    }
}

//*/