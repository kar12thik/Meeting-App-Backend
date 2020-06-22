const express = require("express");
const Room = require("../models/room");
const Customer = require("../models/customer");

const customerRouter = new express.Router();

customerRouter.get("/customers", async (req, res) => {
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
        name : booking.firstName + ' ' + booking.lastName,
        roomName : booking.room.roomName,
        roomId : booking.room.roomId,
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

customerRouter.post("/customers/create", async (req, res) => {
  console.log(req.body);
  try {
    const roomFound = await Room.findOne({ roomId: req.body.roomId });
    console.log(roomFound)
    if (roomFound == null) {
      res.status(400).send({
        message: "No room with that ID exists!",
      });
    } else {
      const { _id, roomId } = roomFound;
      const { updStartTime : newStartTime , updEndTime : newEndTime } = getTimeinMinutes(req.body.startTime, req.body.endTime);
      const getRoomBookings = await Customer.find({
        room: _id,
        bookingDate: new Date(req.body.bookingDate),
      });
      if (getRoomBookings.length === 0) {
        const customer = new Customer({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          bookingDate: req.body.bookingDate,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          room: _id,
        });
        await customer.save();
        console.log(customer);
        res.status(201).send({
          message: `Room booked Successfully`,
        });
      } else {
        let validBooking = true;
        getRoomBookings.forEach((bookedRoom) =>  {
          const { updStartTime : savedStartTime, updEndTime : savedEndTime } = getTimeinMinutes(bookedRoom.startTime, bookedRoom.endTime)
          // const newStartTime = +updStartTime;
          // const newEndTime = + updEndTime;
          // let savedStartTime = +bookedRoom.startTime;
          // let savedEndTime = +bookedRoom.endTime;
          console.log(newStartTime, newEndTime)
          console.log(savedStartTime,savedEndTime)
          if (
            savedStartTime >= newStartTime &&
            savedStartTime < newEndTime
          ) {
            validBooking = false;
          }
          if (
            savedEndTime > newStartTime &&
            savedEndTime <= newEndTime
          ) {
            validBooking = false;
          }
        });
        console.log(validBooking);
        if (validBooking) {
          const customer = new Customer({
            firstName: req.body.firstName,
            lastName: req.body.firstName,
            bookingDate: req.body.bookingDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            room: _id,
          });
          await customer.save();
          console.log(customer);
          res.status(201).send({
            message: `Room booked Successfully`,
          });
        } else {
          console.log("Meeting time clash, choose another time/date");
          res.status(401).send({
            message: "Meeting time clash, choose another time/date",
          });
        }
      }
    }
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

module.exports = customerRouter;
