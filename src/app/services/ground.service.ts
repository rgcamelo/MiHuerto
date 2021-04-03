import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bed } from '../models/bed.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  pageBeds=0;

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

  getGround(id:string){
    return this.ejecutarQuery<GroundOneObject>(`grounds/${id}`);
  }

  getReloadsBeds(id:string){
    this.pageBeds= 1;
    return this.ejecutarQuery<BedObject>(`grounds/${id}/beds?page=${this.pageBeds}`);
  }

  getBeds(id:string){
    this.pageBeds++;
    return this.ejecutarQuery<BedObject>(`grounds/${id}/beds?page=${this.pageBeds}`);
  }

  createBed(id:string,bed:Bed){
    return this.postejecutarQuery<BedObject>(`grounds/${id}/beds`,bed);
  }

  deleteBed(idGround:string,idBed:string){
    return this.deleteejecutarQuery<BedOneObject>(`grounds/${idGround}/beds/${idBed}`);
  }

  updateBed(idGround:string,idBed:string,bed:Bed){
    return this.updateejecutarQuery<BedOneObject>(`grounds/${idGround}/beds/${idBed}`,bed);
  }
}
