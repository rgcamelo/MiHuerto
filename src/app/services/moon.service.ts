import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

const apiMoon = environment.apiMoon;

@Injectable({
  providedIn: 'root'
})
export class MoonService {

  constructor(private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query = apiMoon+query;
    return this.http.get<T>(query);
  }

  getMoon(lunarVariables){
    let gets=[]
    for (var i in lunarVariables){
        gets.push(i + "=" +encodeURIComponent(lunarVariables[i]))
    }
    gets.push("LDZ=" + new Date(lunarVariables.year,lunarVariables.month-1,1).getTime()/1000);
    return this.ejecutarQuery<LunarObject>(gets.join("&"));
  }
}
