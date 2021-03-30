import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Garden } from '../models/garden.model';
import { Ground } from '../models/ground.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class GardenService {
  pageGrounds=0

  constructor(private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query = apiUrl+query;
    return this.http.get<T>(query);
  }

  private postejecutarQuery<T>(query:string,object:any){
    query = apiUrl+query;
    return this.http.post<T>(query,object);
  }

  private updateejecutarQuery<T>(query:string,object:any){
    query = apiUrl+query;
    return this.http.put<T>(query,object);
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

  getGarden(id:string){
    console.log("Aqui");
    return this.ejecutarQuery<GardenOneObject>(`gardens/${id}`);
  }

  deleteGarden(id:string){
    return this.deleteejecutarQuery<GardenObject>(`gardens/${id}`)
  }

  getReloadGrounds(id:string){
    this.pageGrounds = 1;
    return this.ejecutarQuery<GroundObject>(`gardens/${id}/grounds?page=1`);
  }

  getGrounds(id:string){
    this.pageGrounds++;
    return this.ejecutarQuery<GroundObject>(`gardens/${id}/grounds?page=${this.pageGrounds}`);
  }

  createGround(id:string,ground:Ground){
    return this.postejecutarQuery<GroundOneObject>(`gardens/${id}/grounds`,ground);
  }

  updateGround(idGarden:string,idGround:string,ground:Ground){
    return this.updateejecutarQuery<GroundOneObject>(`gardens/${idGarden}/grounds/${idGround}`,ground);
  }
}
