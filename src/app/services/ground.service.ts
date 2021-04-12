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


  getBeds(id:string,url?:string){
    if(url){
      return this.http.get<BedObject>(url);
    }else{
      return this.ejecutarQuery<BedObject>(`grounds/${id}/beds?page=1`);
    }
    
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
