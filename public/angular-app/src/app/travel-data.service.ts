import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Travel } from './travel-one/travel-one.component';
import { Travels } from './travel-list/travel-list.component';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  private apiBaseUrl: string = "http://localhost:3000/api"

  constructor(private httpClient:HttpClient) { }
  public getTravels():Promise<Travels[]>{
    const url :string =this.apiBaseUrl+"/travels";
    return this.httpClient.get(url).toPromise().then(response=> response as Travels[])
    .catch(this.handleError)
  }

  public getOneTravel(travelId:string): Promise<Travel>{
    const url: string =this.apiBaseUrl+"/travels/" +travelId;
    return this.httpClient.get(url).toPromise()
    .then(response => response as Travel)//cast it to game array
    .catch(this.handleError);
  }
  public deleteOneTravel(travelId:string): Promise<Travel>{
   
    const url: string =this.apiBaseUrl+"/travels/" +travelId;
    return this.httpClient.delete(url).toPromise()
    .then(response => response as Travel)//cast it to game array
    .catch(this.handleError);
  }
  private handleError(error:any): Promise<any>{
    console.log("error",error);
    return Promise.reject(error.messsage ||error);

    
  }
}
