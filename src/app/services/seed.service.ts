import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SeedObject, SeedOneObject } from '../interfaces/seedInterface';
import { Seed } from '../models/seed.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(private http:HttpService) { }

  createSeed(seed:Seed){
    return this.http.postejecutarQuery<SeedOneObject>(`seeds`,seed);
  }

  getSeeds(url?:string){
    if (url) {
      return this.http.ejecutarNextQuery<SeedObject>(url);
    }
    else{
      return this.http.ejecutarQuery<SeedObject>(`seeds?page=1`);
    }
  }

  updateSeed(idSeed:string,seed:Seed){
    return this.http.updateejecutarQuery<SeedOneObject>(`seeds/${idSeed}`,seed);
  }

  deleteSeed(idSeed:string){
    return this.http.deleteejecutarQuery<SeedOneObject>(`seeds/${idSeed}`);
  }

  getSeedsAll(){
    return this.http.ejecutarQuery<SeedObject>(`seeds`);
  }

  getCrops(id:string,url?:string){
    if (url) {
      return this.http.ejecutarNextQuery<CropObject>(url);
    }else{
      return this.http.ejecutarQuery<CropObject>(`seeds/${id}/crops?page=1`);
    }
    
  }

  searchSeed(buscar:string){
    return this.http.ejecutarQuery<SeedObject>(`seeds?name=${buscar}`);
  }
}
