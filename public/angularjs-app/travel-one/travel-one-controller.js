angular.module("MyTravels").controller("TravelController", TravelController);

function TravelController(TravelsFactory, $routeParams) {
    const vm = this;
    const travelId = $routeParams.travelId;
    const hotelId = $routeParams.hotelId;
    console.log("hotelId", hotelId);
    vm.message = "";
    TravelsFactory.getOneTravel(travelId).then(function (response) {
        vm.travel = response;

    });

    vm.updateTravel = function (travelId) {
        const travel = {
            destination: vm.destination,
            averageTicketPrice: vm.averageTicketPrice,
            distance: vm.distance,
        }

        if (vm.myform.$dirty && vm.myform.$valid) {
            TravelsFactory.updateOneTravel(travelId, travel).then(function (response) {
                console.log("Travel updated", response);
                vm.message = "Travel sucessfully updated"
               

            })
            window.location.reload ('#!/travels/{{travelId}}');
        }
    }
    //===========================Hotel============================
    TravelsFactory.getAllHotels(travelId).then(function (response) {
        vm.hotels = response;
    });
    TravelsFactory.getOneHotel(travelId, hotelId).then(function (response) {
        vm.hotel = response;
        console.log("Hotel found here", response);

    });
    vm.deleteHotel = function (travelId, hotelId) {
        TravelsFactory.deleteOneHotel(travelId, hotelId).then(function (response) {
            vm.message = "Hotel succesfully deleted"
            console.log("Hotel deleted", response);
            window.location.reload ('#!/travels/{{travelId}}/hotels');
 
        });
    }

    vm.addHotel = function (travelId) {
        const newHotel = {
            name: vm.name,
            star: vm.star,

        }
        if (vm.myform.$dirty && vm.myform.$valid) {
            TravelsFactory.addOneHotel(travelId, newHotel).then(function (response) {

                console.log("Hotel saved", response);
                vm.message = "Hotel Saved"
                window.location.reload ('#!/travels/{{travelId}}/hotels');

            });
        }

    }
    vm.updateHotel = function (travelId, hotelId) {
        const hotel = {
            name: vm.name,
            star: vm.star
        }

        if (vm.myform.$dirty && vm.myform.$valid) {
            TravelsFactory.updateOneHotel(travelId, hotelId, hotel).then(function (response) {
                console.log("Hotel updated", response);
                vm.message = "Hotel sucessfully updated"
                window.location.reload ('#!/travels/{{travelId}}/hotels/{{hotelId}}');

            })
        }
    }

}
