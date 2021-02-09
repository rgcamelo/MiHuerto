import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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

  getGardens(){
    return this.ejecutarQuery<GardenObject>(`gardens`);
  }

  getGrounds(id:string){
    return this.ejecutarQuery<GroundObject>(`gardens/${id}/grounds`);
  }
}
