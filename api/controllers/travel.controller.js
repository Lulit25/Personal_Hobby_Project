const mongoose = require('mongoose');
const Travel = mongoose.model("Travel");

const getAll = function (req, res) {
    Travel.find().exec(function (err, travels) {
        const response = { status: 204, messsage: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!travels) {
            response.status = 404;
            response.messsage = err;
        }
        else {
            response.status = 200;
            response.messsage = travels;
        }
        res.status(response.status).json(response.messsage);

    });
}

const getOne = function (req, res) {
    const travelId = req.params.travelId;

    Travel.findById(travelId).exec(function (err, travel) {
        const response = { status: 204, message: [] }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (!travel) {
            response.status = 404;
            response.message = { "message": "Travel does not exist" }
        }
        else {
            response.status = 200;
            response.message = travel;
        }
        res.status(response.status).json(response.message);
    })
}

const addOne = function (req, res) {
    const newTravel = {
        destination: req.body.destination,
        averageTicketPrice: parseFloat(req.body.averageTicketPrice),
        distance: parseFloat(req.body.distance)
    }
    Travel.create(newTravel, function (err, travel) {
        const response = { status: 204, message: [] }
        if (err) {
            response.status = 500
            response.message = err;
        }
        else if (!travel) {
            response.status = 404;
            response.message = { "message": "travel does not exist" };
        }
        else {
            response.status = 200;
            response.message = { "message": "travel added successfully" }
        }
        res.status(response.status).json(response.message);
    })
}

const deleteOne = function (req, res) {
    const travelId = req.params.travelId;
    Travel.findByIdAndRemove(travelId).exec(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;

        }
        else if (!travel) {
            response.status = 404;
            response.message = { "message": "Travel does not exist" }
        }
        else {
            response.status = 200;
            response.message = { "message": "Travel deleted" }
        }
        res.status(response.status).json(response.messsage);
    });
}

const updateOne = function (req, res) {
    const travelId = req.params.travelId;
    Travel.findById(travelId).exec(function (err, travel) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.messsage = err;
        }
        else if (!travel) {
            response.status = 404;
            response.messsage = { "message": "Travel does not esist" }
        }
        else {
            travel.destination = req.body.destination;
            travel.distance = req.body.distance;
            travel.averageTicketPrice = req.body.averageTicketPrice;
            travel.save(function (err, travel) {
                if (err) {
                    response.status = 500;
                    response.message = { "message": "Error getting Travel" };
                }
                else {
                    response.status = 200;
                    response.message = travel;
                }
                res.status(response.status).json(response.messsage);
            });

        }
    });
}
module.exports = {
    getAllTravels: getAll,
    getOneTravel: getOne,
    addOneTravel: addOne,
    deleteOneTravel: deleteOne,
    updateOneTravel: updateOne
}