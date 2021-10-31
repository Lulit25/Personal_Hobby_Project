import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {RouterModule} from '@angular/router';


import { TravelDataService } from '../travel-data.service';


@Component({
  selector: 'app-travel-one',
  templateUrl: './travel-one.component.html',
  styleUrls: ['./travel-one.component.css']
})
export class TravelOneComponent implements OnInit {
travel!:Travel;
routeParams!: Params;
travelId!:string;
  constructor(private travelDataService: TravelDataService, private activatedRoute:ActivatedRoute) {
    this.getRouteParams();

   }


  ngOnInit(): void {
    this.travelDataService.getOneTravel(this.travelId).then(response=> this.travel=response)

  }
  getRouteParams() {
    this.activatedRoute.params.subscribe( params => {
        this.routeParams = params;
        this.travelId=this.routeParams.travelId;
    });
  }


}
export class Travel{
  _id!:string;
  destination!:string;
  averageTicketPrice!:Number;
  distance!:Number;

}
