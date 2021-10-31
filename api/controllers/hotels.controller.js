const mongoose = require("mongoose");
const Travel = mongoose.model("Travel");
const ObjectId = require('mongodb').ObjectId;

const getAll = function (req, res) {
    const travelId = req.params.travelId;
    Travel.findById(travelId).exec(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!travel) {
            response.status = 404;
            response.message = { "message": " travel does not exist" };
        }
        else {
            response.status = 200;
            response.message = travel.hotels;
        }

        res.status(response.status).json(response.message);

    });
}

const getOne = function (req, res) {
    const travelId = req.params.travelId;
    const hotelId = req.params.hotelId;
    var hotel = null;
    Travel.findById(travelId).exec(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!travel) {
            response.status = 404;
            response.message = { "message": " travel does not exist" };
        }
        else {
            hotel = travel.hotels.id(hotelId);
            response.status = 200;
            response.message = hotel;
        }

        res.status(response.status).json(response.message);

    });
}

const _addOne = function (req, res, travel) {
    const newHotel = {
        name: req.body.name,
        star: parseFloat(req.body.star)
    }
    travel.hotels.push(newHotel);
    travel.save(function (err, travel) {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            console.log("got here");
            response.status = 201;
            response.message = travel.hotels;
        }
        res.status(response.status).json(response.message);
    });
}

const addOne = function (req, res) {
    const travelId = req.params.travelId;
    Travel.findById(travelId).exec(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!travel) {
            response.status = 404;
            response.message = { "message": " travel does not exist" };
        }
        if (travel) {
            _addOne(req, res, travel);
            return;
        }
        res.status(response.status).json(response.message);
    });
}

const _updateHotel = function (req, res, travel, hotelId) {
    console.log("name",  req.body.star);
    travel.hotels.id(hotelId).name = req.body.name;
    travel.hotels.id(hotelId).star = req.body.star;
    travel.save(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = travel.hotels;
        }
        res.status(response.status).json(response.message);
    });
}

const updateHotel = function (req, res) {
    const travelId = req.params.travelId;
    const hotelId = req.params.hotelId;
    Travel.findById(travelId).select("hotels").exec(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            console.log("Error finding travel");
            response.status = 500;
            response.message = err;
        }
        else if (!travel) {
            console.log("Travel id not found in database");
            response.status = 404;
            response.message = { "message": "Travel ID not found" + travelId };
        }
        if (travel) {
            _updateHotel(req, res, travel, hotelId);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    }
    );
}

const _deleteHotel = function (req, res, travel, hotelId) {
    travel.hotels.remove({ "_id": ObjectId(hotelId) });
    travel.save(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = { "message": "Can not find travel" };
        }
        else if (!travel) {
            response.status = 404;
            response.message = { "message": " travel does not exist" };
        }
        else {
            response.status = 200;
            response.message = { "message": "hotel deleted" }
        }
        res.status(response.status).json(response.message);

    });
}

const deleteHotel = function (req, res) {
    const travelId = req.params.travelId;
    const hotelId = req.params.hotelId;
    Travel.findById(travelId).select("hotels").exec(function (err, doc) {
        const response = { status: 204, message: [] };
        if (err) {
            console.log("error getting travel");
            response.status = 500
            response.message = { "message": "Can not find hotel" };
        }
        else if (!doc) {
            response.status = 404;
            response.message = { "message": " hotel does not exist" };
        }
        if (doc) {
            _deleteHotel(req, res, doc, hotelId);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}

module.exports = {
    getAllHotels: getAll,
    getOneHotel: getOne,
    addOneHotel: addOne,
    updateOneHotel: updateHotel,
    deleteOneHotel: deleteHotel
}