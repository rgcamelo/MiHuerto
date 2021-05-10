import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CareObject, CareOneObject } from '../interfaces/careinterface';
import { PlantOneObject } from '../interfaces/plantInterface';
import { Care } from '../models/care.model';
import { Crop } from '../models/crop.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http:HttpService) { }

  getPlant(id:string){
     return this.http.ejecutarQuery<PlantOneObject>(`plants/${id}`);
  }


  createCare(id:string,care:Care){
    return this.http.postejecutarQuery<CareObject>(`plants/${id}/cares`,care);
  }

  getCares(id:string,url?:string){
    if(url){
      return this.http.ejecutarNextQuery<CareObject>(url);
    }else{
      return this.http.ejecutarQuery<CareObject>(`plants/${id}/cares?page=1`);
    }
  }

  updateCare(idPlant:string,idCare:string,care:Care){
    return this.http.updateejecutarQuery<CareOneObject>(`plants/${idPlant}/cares/${idCare}`,care);
  }

  deleteCare(idPlant:string,idCare:string){
    return this.http.deleteejecutarQuery<CareOneObject>(`plants/${idPlant}/cares/${idCare}`)
  }

  createCrop(id:string,crop:Crop){
    return this.http.postejecutarQuery<CropOneObject>(`plants/${id}/crop`,crop);
  }

  getCrops(id:string,url?:string){
    if (url) {
      return this.http.ejecutarNextQuery<CropObject>(url);
    }else{
      return this.http.ejecutarQuery<CropObject>(`plants/${id}/crop?page=1`);
    }
    
  }
}
