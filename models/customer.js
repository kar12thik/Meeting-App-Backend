const mongoose = require("mongoose");
// require('../config/mongoose')

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true, 
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }
});

const Customer = mongoose.model("Customer", customerSchema);

// const myTestCustomer = new Customer({
//   firstName: "Lebron",
//   lastName: "James",
//   bookingDate: "2020-06-22",
//   startTime: 20,
//   endTime: 1,
//   room: mongoose.Types.ObjectId("5eeda360d71d277b00a89365")
// });

// myTestCustomer.save()
// .then(response => {
//   console.log(response);
// }).catch(console.error);

module.exports = Customer;
