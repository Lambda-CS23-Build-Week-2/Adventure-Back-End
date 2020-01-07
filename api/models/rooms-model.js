const db = require('../config/config');

module.exports = {
    getAllRooms
}

function getAllRooms() {
    return db("rooms")
}