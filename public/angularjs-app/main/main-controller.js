angular.module("MyTravels").controller("MainController", MainController);

function MainController(TravelsFactory){
    const vm = this;
    vm.message="";
    vm.addUser= function(){
        const newUser ={
            name:vm.name,
            username:vm.username,
            password:vm.password,
          
        }
        if(vm.myform.$dirty && vm.myform.$valid){
        TravelsFactory.addOneUser(newUser).then(function (response){
        
            console.log("User saved", response);
            vm.message= "User added"
        
        });
    }
}
                
}