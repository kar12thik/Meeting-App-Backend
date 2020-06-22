------------------------------
Meeting Hall Booking WebApp: 
	- Create a Room
		- Number of Seats available
		- amenities in room
		- Price for 1 Hour
	
	- Book Room (Should not allow in same date and time)
		- Customer Name
		- Date
		- Start Time
		- End Time
		- Room ID

	- List all Rooms with Booked Data
		- Room Name
		- booked Status
		- customer name
		- Date
		- Start Time
		- End Time

	- List all customers with booked Data
		- Customer name
		- Room Name
		- Date - Start Time - End Time
------------------------------

Mercury
- Seats Available - 6
- Price - 500INR
- Projector
- Screen

Venus
- Seats Available - 8
- Price - 1000INR
- Projector
- Screen
- Speakers

Pluto
- Seats Available - 20
- Price - 1500INR
- Conference Call Phone
- Large Monitor
- White Board

Earth
- Seats Available - 20
- Price - 2500INR
- Projector
- Screen
- Conference Call Phone
- Speakers
- Large Monitor
- White Board
- Comfortable Chairs

Routes 
------------
/post/room
/post/customer
/get/rooms
/get/customers

Database
----------
Room 
- RoomId (.find().Count() + 1
- RoomName

Customer
- Name
- Date
- Start Time
- End Time

Room Instance
- RoomId
- Room booked status

-Everytime Room is created, update Room instance and room status
-Everytime Customer books a room, update Room Instance status
-A room cannot be booked in the same date and time


