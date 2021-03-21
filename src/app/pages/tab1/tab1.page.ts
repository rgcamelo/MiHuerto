import { Component, OnInit } from '@angular/core';
import { limitDay } from 'src/app/models/moon.model';
import { MoonService } from '../../services/moon.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  moon:LunarObject;

  day:number;
  nameDay:string;
  monthName:string;
  moonYear:number;
  moonImage:string;
  phaseName:string;
  phaseLimit:string;
  ligth:string;

  limits:limitDay[] = [];
  activities:string[] = [];

  constructor(private moonService:MoonService) {
  }

  configMoon = {
    lang  		:'es', 
    month 		:new Date().getMonth() + 1,
    year  		:new Date().getFullYear(),
    size		:150, 
    lightColor	:"rgb(255,255,210)", 
    shadeColor	:"black", 
    texturize	:false, 
  }

  configMoon2 = {
    lang  		:'es', 
    month 		:new Date().getMonth() + 1,
    year  		:new Date().getFullYear(),
    size		:"100%", 
    lightColor	:"rgb(255,255,230)", 
    shadeColor	:"transparent", 
    texturize	:true, 
  }

  
  ngOnInit(){
    this.cargarMoon();
  }

  cargarMoon(){
    this.moonService.getMoon(this.configMoon).subscribe( res =>{
      this.moonPhase(res);
      
    })
    this.moonService.getMoon(this.configMoon2).subscribe(res =>{
      this.moonPhases(res);
    })
  }

  cargarActivities(phase:string){
    this.activities = [];
    if (phase == "Cuarto menguante" || phase=="Menguante") {
      this.moonService.getCMActivities().subscribe(res =>{
        this.activities.push(...res);
      })
    }

    if (phase =="Luna nueva") {
      this.moonService.getLNActivities().subscribe(res =>{
        this.activities.push(...res);
      })
    }

    if (phase =="Creciente" || phase=="Cuarto creciente") {
      this.moonService.getCCActivities().subscribe(res =>{
        this.activities.push(...res);
      })
    }

    if (phase =="Luna llena") {
      this.moonService.getLLActivities().subscribe(res =>{
        this.activities.push(...res);
      })
    }
    
  }

  moonPhase(moon:LunarObject){    
  this.moon = moon;
  this.day = new Date().getDate();
  let dayWeek=moon.phase[this.day].dayWeek;

  this.nameDay =  moon.nameDay[dayWeek];
  this.monthName = moon.monthName;
  this.moonYear = moon.year;
  this.moonImage = moon.phase[this.day].svg;
  this.phaseName = moon.phase[this.day].phaseName;
  this.phaseLimit = moon.phase[this.day].isPhaseLimit;
  this.ligth = moon.phase[this.day].lighting;

  this.cargarActivities(this.phaseName);
  } 

  

  moonPhases(moon:LunarObject){
    this.limits = [];
    for (let nDay in moon.phase) {
      if (moon.phase[nDay].isPhaseLimit) {
        let limitday:limitDay = new limitDay();
        limitday.nday = nDay;
        limitday.svg = moon.phase[nDay].svg;
        limitday.phasename = moon.phase[nDay].phaseName;
        this.limits.push(limitday);
      }
    }
  }

  doRefresh( event){
    this.cargarMoon();
    event.target.complete();
  }

}


