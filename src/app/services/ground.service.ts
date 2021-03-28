import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bed } from '../models/bed.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GroundService {

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

  getGround(id:string){
    return this.ejecutarQuery<GroundOneObject>(`grounds/${id}`);
  }

  getBeds(id:string){
    return this.ejecutarQuery<BedObject>(`grounds/${id}/beds`);
  }

  createBed(id:string,bed:Bed){
    return this.postejecutarQuery<BedObject>(`grounds/${id}/beds`,bed);
  }

  deleteBed(idGround:string,idBed:string){
    console.log(idGround,idBed);
    return this.deleteejecutarQuery<BedObject>(`grounds/${idGround}/beds/${idBed}`);
  }
}
