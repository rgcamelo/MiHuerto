import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plant } from '../models/plant.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BedService {

  constructor(private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query = apiUrl+query;
    return this.http.get<T>(query);
  }

  private postejecutarQuery<T>(query:string,object:any){
    query = apiUrl+query;
    return this.http.post<T>(query,object);
  }

  

  private deleteejecutarQuery<T>(query:string){
    query = apiUrl+query;
    return this.http.delete<T>(query);
  }

  getBed(id:string){
    return this.ejecutarQuery<BedOneObject>(`beds/${id}`);
  }

  

  getPlants(id:string){
    return this.ejecutarQuery<PlantObject>(`beds/${id}/plants`);
  }

  createPlant(idBed:string,idSeed:string,plant:Plant){
    return this.postejecutarQuery<PlantObject>(`beds/${idBed}/seed/${idSeed}/plants`,plant);
  }

  deletePlant(idBed:string,idSeed:string,idPlant:string){
    return this.deleteejecutarQuery<PlantOneObject>(`beds/${idBed}/seed/${idSeed}/plants/${idPlant}`);
  }
}
