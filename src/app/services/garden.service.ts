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

  getGardens(url?:string){
    if (url) {
      return this.http.get<GardenObject>(url);
    }else{
      return this.ejecutarQuery<GardenObject>(`gardens`);
    }
    
  }

  getGarden(id:string){
    return this.ejecutarQuery<GardenOneObject>(`gardens/${id}`);
  }

  deleteGarden(id:string){
    return this.deleteejecutarQuery<GardenOneObject>(`gardens/${id}`)
  }

  getGrounds(id:string,url?:string){
    if (url) {
      return this.http.get<GroundObject>(url);
    }else{
      return this.ejecutarQuery<GroundObject>(`gardens/${id}/grounds?page=1`);
    }
  }

  createGround(id:string,ground:Ground){
    return this.postejecutarQuery<GroundOneObject>(`gardens/${id}/grounds`,ground);
  }

  updateGround(idGarden:string,idGround:string,ground:Ground){
    return this.updateejecutarQuery<GroundOneObject>(`gardens/${idGarden}/grounds/${idGround}`,ground);
  }
}
