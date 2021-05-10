import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GardenObject, GardenOneObject } from '../interfaces/gardenInterface';
import { Garden } from '../models/garden.model';
import { Ground } from '../models/ground.model';
import { HttpService } from './http.service';



@Injectable({
  providedIn: 'root'
})

export class GardenService {
  pageGrounds=0

  constructor(private http:HttpService) { }
 
  createGarden(garden:Garden){
    return this.http.postejecutarQuery<GardenObject>(`gardens`,garden);
  }

  getGardens(url?:string){
    if (url) {
      return this.http.ejecutarNextQuery<GardenObject>(url);
    }else{
      return this.http.ejecutarQuery<GardenObject>(`gardens`);
    }
    
  }

  getGarden(id:string){
    return this.http.ejecutarQuery<GardenOneObject>(`gardens/${id}`);
  }

  updateGarden(id:string,garden:Garden){
    return this.http.updateejecutarQuery<GardenOneObject>(`gardens/${id}`,garden);
  }

  deleteGarden(id:string){
    return this.http.deleteejecutarQuery<GardenOneObject>(`gardens/${id}`)
  }

  getGrounds(id:string,url?:string){
    if (url) {
      return this.http.ejecutarNextQuery<GroundObject>(url);
    }else{
      return this.http.ejecutarQuery<GroundObject>(`gardens/${id}/grounds?page=1`);
    }
  }

  createGround(id:string,ground:Ground){
    return this.http.postejecutarQuery<GroundOneObject>(`gardens/${id}/grounds`,ground);
  }

  updateGround(idGarden:string,idGround:string,ground:Ground){
    return this.http.updateejecutarQuery<GroundOneObject>(`gardens/${idGarden}/grounds/${idGround}`,ground);
  }

  deleteGround(idGarden:string,idGround:string){
    return this.http.deleteejecutarQuery<GroundOneObject>(`gardens/${idGarden}/grounds/${idGround}`);
  }

  
}
