angular.module("MyTravels").controller("TravelsController", TravelsController);

function TravelsController(TravelsFactory) {
    const vm = this;
    vm.message = "";
    TravelsFactory.getAllTravels().then(function (response) {
        vm.travels = response;
    });

    vm.deleteTravel = function (travelId) {
        TravelsFactory.deleteOneTravel(travelId).then(function (response) {
            vm.message = "Travel succesfully deleted"
            console.log("Travel deleted", response);
            window.location.reload ('#!/travels');

        });
    }

    vm.addTravel = function () {
        const newTravel = {
            destination: vm.destination,
            averageTicketPrice: vm.averageTicketPrice,
            distance: vm.distance,

        }
        TravelsFactory.addOneTravel(newTravel).then(function (response) {

            console.log("Travel saved", response);
            vm.message = "Travel Saved"
            window.location.reload ('#!/travels');
        })

    }
   
}
