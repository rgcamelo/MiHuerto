import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BedObject, BedOneObject } from '../interfaces/bedInterface';
import { Bed } from '../models/bed.model';
import { HttpService } from './http.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  pageBeds=0;

  constructor(private http:HttpService) { }

  getGround(id:string){
    return this.http.ejecutarQuery<GroundOneObject>(`grounds/${id}`);
  }


  getBeds(id:string,url?:string){
    if(url){
      return this.http.ejecutarNextQuery<BedObject>(url);
    }else{
      return this.http.ejecutarQuery<BedObject>(`grounds/${id}/beds?page=1`);
    }
    
  }

  createBed(id:string,bed:Bed){
    return this.http.postejecutarQuery<BedObject>(`grounds/${id}/beds`,bed);
  }

  deleteBed(idGround:string,idBed:string){
    return this.http.deleteejecutarQuery<BedOneObject>(`grounds/${idGround}/beds/${idBed}`);
  }

  updateBed(idGround:string,idBed:string,bed:Bed){
    return this.http.updateejecutarQuery<BedOneObject>(`grounds/${idGround}/beds/${idBed}`,bed);
  }
}
