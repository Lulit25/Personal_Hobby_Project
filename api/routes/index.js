const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const hotelController = require('../controllers/hotels.controller');
const usersController = require('../controllers/users.controller');


router.route("/travels")
.get(travelController.getAllTravels)
.post(travelController.addOneTravel);

router.route("/travels/:travelId")
.get(travelController.getOneTravel)
.put(travelController.updateOneTravel)
.delete(travelController.deleteOneTravel);

router.route("/travels/:travelId/hotels")
.get(hotelController.getAllHotels)
.post(hotelController.addOneHotel);

router.route("/travels/:travelId/hotels/:hotelId")
.get(hotelController.getOneHotel)
.put(hotelController.updateOneHotel)
.delete(hotelController.deleteOneHotel);


router.route("/users")
.post(usersController.addUser);

module.exports = router;