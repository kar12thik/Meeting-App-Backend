const mongoose = require('mongoose')
// require('../config/mongoose')

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    roomId: {
      type: String,
      required: true
    }
})

const Room = mongoose.model('Room', roomSchema)

// const myTestRoom = new Room({
//     roomName: "VENUS",
//     roomId: 'V1'
// });

// myTestRoom.save()
//   .then(response => {
//     console.log(response);
//   }).catch(console.error);

module.exports = Room