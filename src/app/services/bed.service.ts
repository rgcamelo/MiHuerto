import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BedOneObject } from '../interfaces/bedInterface';
import { PlantObject, PlantOneObject } from '../interfaces/plantInterface';
import { Plant } from '../models/plant.model';
import { HttpService } from './http.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BedService {

  constructor(private http:HttpService) { }


  getBed(id:string){
    return this.http.ejecutarQuery<BedOneObject>(`beds/${id}`);
  }

  

  getPlants(id:string,url?:string){
    if(url){
      return this.http.ejecutarNextQuery<PlantObject>(url);
    }
    else{
      return this.http.ejecutarQuery<PlantObject>(`beds/${id}/plants?page=1`);
    }
    
  }

  createPlant(idBed:string,idSeed:string,plant:Plant){
    return this.http.postejecutarQuery<PlantOneObject>(`beds/${idBed}/seed/${idSeed}/plants`,plant);
  }

  updatePlant(idBed:string,idSeed:string,idPlant:string,plant:Plant){
    return this.http.updateejecutarQuery<PlantOneObject>(`beds/${idBed}/seed/${idSeed}/plants/${idPlant}`,plant);
  }

  deletePlant(idBed:string,idSeed:string,idPlant:string){
    return this.http.deleteejecutarQuery<PlantOneObject>(`beds/${idBed}/seed/${idSeed}/plants/${idPlant}`);
  }
}
