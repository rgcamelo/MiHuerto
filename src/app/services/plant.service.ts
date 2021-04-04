import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Care } from '../models/care.model';
import { Crop } from '../models/crop.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query = apiUrl+query;
    return this.http.get<T>(query);
  }

  private postejecutarQuery<T>(query:string,object:any){
    query = apiUrl+query;
    return this.http.post<T>(query,object);
  }

  getPlant(id:string){
     return this.ejecutarQuery<PlantOneObject>(`plants/${id}`);
  }


  createCare(id:string,care:Care){
    return this.postejecutarQuery<CareObject>(`plants/${id}/cares`,care);
  }

  getCares(id:string){
    return this.ejecutarQuery<CareObject>(`plants/${id}/cares`);
  }

  createCrop(id:string,crop:Crop){
    return this.postejecutarQuery<CropOneObject>(`plants/${id}/crop`,crop);
  }

  getCrops(id:string){
    return this.ejecutarQuery<CropObject>(`plants/${id}/crop`);
  }
}
