const express = require("express");
const Room = require("../models/room");
const Customer = require("../models/customer");

const roomRouter = new express.Router();

const getTimeinMinutes = (stTime, etTime) => {
  const stTimeArr = stTime.split(":");
  const etTimeArr = etTime.split(":");
  const newStTime = +stTimeArr[0] * 60 + +stTimeArr[1];
  const newEtTime = +etTimeArr[0] * 60 + +etTimeArr[1];
  return {
    updStartTime: newStTime,
    updEndTime: newEtTime,
  };
};

roomRouter.post("/rooms/create", async (req, res) => {
  const room = new Room(req.body);
  console.log(req.body);
  try {
    const roomCheck = await Room.find().countDocuments({
      roomName: req.body.roomName,
    });
    room.roomId = req.body.roomName.charAt(0).toUpperCase() + (roomCheck + 1)
    console.log(room)
    await room.save();
    res.status(201).send({
      message : `Room created with ID : ${room.roomId}`
    });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

roomRouter.get("/rooms", async (req, res) => {
  const rooms = []
  try { 
    const getAllBookings = await Customer.find().populate('room')
    getAllBookings.forEach(booking => {
      const date = booking.bookingDate
      const convertedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
      .toISOString()
      .split("T")[0];
      const { updStartTime : newStartTime , updEndTime : newEndTime } = getTimeinMinutes(booking.startTime, booking.endTime);
      const diffHours = Math.round((newEndTime - newStartTime)/60);
      const amount = (booking.room.roomId.charAt(0) === 'M' ? diffHours*1500 : ((booking.room.roomId.charAt(0) === 'V') ? diffHours*2500 : diffHours*3500))
      console.log(amount)
      rooms.push({
        roomName : booking.room.roomName,
        roomId : booking.room.roomId,
        bookedStatus : true,
        name : booking.firstName + ' ' + booking.lastName,
        bookingDate : convertedDate,
        startTime : booking.startTime,
        endTime: booking.endTime,
        amount
      })
    })
    res.status(201).send(rooms);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

module.exports = roomRouter;
