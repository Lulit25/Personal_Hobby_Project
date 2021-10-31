angular.module("MyTravels").factory("TravelsFactory", TravelsFactory);

function TravelsFactory($http){
    return{
        getAllTravels:getAll,
        getOneTravel:getOne,
        addOneTravel:addOne,
        updateOneTravel:updateOne,
        deleteOneTravel: deleteOne,
        addOneUser:addUser,
        getAllHotels:getAllHotels,
        getOneHotel:getOneHotel,
        deleteOneHotel:deleteOneHotel,
        addOneHotel:addOneHotel,
        updateOneHotel:updateOneHotel

    }

    function getAll(){
        return $http.get("/api/travels").then(complete).catch(failed);
    }
    function getOne(travelId){
        return $http.get("/api/travels/"+travelId).then(complete).catch(failed);
    }
    function deleteOne(travelId){
        return $http.delete("/api/travels/"+travelId).then(complete).catch(failed);
    }
    function addOne(travel){
        return $http.post("/api/travels", travel).then(complete).catch(failed);
    }

    function updateOne(travelId, travel){
        return $http.put("/api/travels/"+travelId, travel).then(complete).catch(failed);
    }

    function getAllHotels(travelId){
        return $http.get("/api/travels/"+travelId+"/hotels").then(complete).catch(failed);
    }
    function getOneHotel(travelId, hotelId){
        return $http.get("/api/travels/"+travelId+"/hotels/"+hotelId).then(complete).catch(failed);
    }
    function deleteOneHotel(travelId, hotelId){
        return $http.delete("/api/travels/"+travelId+"/hotels/"+hotelId).then(complete).catch(failed);
    }
    function addOneHotel(travelId, hotel){
        return $http.post("/api/travels/"+travelId+"/hotels", hotel).then(complete).catch(failed);
    }

    function updateOneHotel(travelId, hotelId, hotel){
        return $http.put("/api/travels/"+travelId+"/hotels/"+hotelId, hotel).then(complete).catch(failed);
    }

    function addUser(user){
        return $http.post("/api/users", user).then(complete).catch(failed);
    }
    function complete(response){
        console.log("hello", response.data);
        return response.data;
       
    }
    function failed(error){
        return  error.statusText;
    }
}