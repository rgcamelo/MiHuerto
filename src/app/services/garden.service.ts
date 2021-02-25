import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Garden } from '../models/garden.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class GardenService {

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

  createGarden(garden:Garden){
    return this.postejecutarQuery<GardenObject>(`gardens`,garden);
  }

  getGardens(){
    return this.ejecutarQuery<GardenObject>(`gardens`);
  }

  deleteGarden(id:string){
    return this.deleteejecutarQuery<GardenObject>(`gardens/${id}`)
  }

  getGrounds(id:string){
    return this.ejecutarQuery<GroundObject>(`gardens/${id}/grounds`);
  }
}
