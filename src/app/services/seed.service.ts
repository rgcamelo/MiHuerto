import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seed } from '../models/seed.model';


const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query = apiUrl+query;
    return this.http.get<T>(query);
  }

  private postejecutarQuery<T>(query:string,object:any){
    query = apiUrl+query;
    return this.http.post<T>(query,object);
  }

  createSeed(seed:Seed){
    return this.postejecutarQuery<SeedOneObject>(`seeds/`,seed);
  }

  getSeeds(url?:string){
    if (url) {
      return this.http.get<SeedObject>(url);
    }
    else{
      return this.ejecutarQuery<SeedObject>(`seeds?page=1`);
    }
  }

  getCrops(id:string,url?:string){
    if (url) {
      return this.http.get<CropObject>(url);
    }else{
      return this.ejecutarQuery<CropObject>(`seeds/${id}/crops?page=1`);
    }
    
  }
}
