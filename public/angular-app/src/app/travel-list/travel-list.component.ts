import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';


import { TravelDataService } from '../travel-data.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {
travels:Travels[]=[];
  constructor(private travelDataService :TravelDataService ) { }

  ngOnInit(): void {
    this.travelDataService.getTravels().then(response=> this.travels=response)

  }
  deleteTravel (travelId:string):void {
    this.travelDataService.deleteOneTravel(travelId).then(function (response:any) {
        console.log("Travel deleted", response);
  
    });
    window.location.reload();
  }
}

export class Travels{
  _id!:string
  destination!:string;
  averageTicketPrice!:Number;
  distance!:Number;

}