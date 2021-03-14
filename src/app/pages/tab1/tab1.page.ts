import { Component, OnInit } from '@angular/core';
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
    //this.load_moon_phases(this.configMoon,this.example_1);
    //this.load_moon_phases(this.configMoon2,this.example_2);
    //this.load_moon_phases(this.configMoon,this.obtenerNombre);
    this.cargarMoon();
  }

  cargarMoon(){
    this.moonService.getMoon(this.configMoon).subscribe( res =>{
      this.moonPhase(res);
    })
  }

  load_moon_phases(obj,callback){
    let gets=[]
    for (var i in obj){
        gets.push(i + "=" +encodeURIComponent(obj[i]))
    }
    gets.push("LDZ=" + new Date(obj.year,obj.month-1,1).getTime()/1000);
    let xmlhttp = new XMLHttpRequest();
    let url = "https://www.icalendar37.net/lunar/api/?" + gets.join("&")
    console.log(gets);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText))
        }
    }
    console.log(url);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  obtenerNombre(moon){
    var day = new Date().getDate();
    return moon.phase[day].phaseName;
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

  var html = "<div>" +
  "<b>" + moon.nameDay[dayWeek]+ "</b>" +
  "<div>" + this.day + " <b>" + moon.monthName + "</b> " +
  moon.year + "</div>" +
  "<div shadow>" + moon.phase[this.day].svg + "</div>" +
  "<div>" + moon.phase[this.day].phaseName + " " +
  "" + ((moon.phase[this.day].isPhaseLimit )? ""  :   Math.round(moon.phase[this.day].lighting) + "%") +
  "</div>" +
  "</div>";
  document.getElementById("ex1").innerHTML = html;
  
} 

example_2(moon){     
  var phMax = []
  for (var nDay in moon.phase){
      if (moon.phase[nDay].isPhaseLimit){
          phMax.push(
              '<ion-col>'+
              '<div>' +
              '<span>' + nDay + '</span>' +
              moon.phase[nDay].svg  +
              '<div>' + moon.phase[nDay].phaseName  + '</div>' +
              '</div>'+
              '</ion-col>' 
          ) 
      }
  }
  var width = 90 / phMax.length
  var html = "<b>" + moon.monthName + " "+ moon.year + "</b>"
  html += '<ion-row>'
  phMax.forEach(function(element){
      html += '<div style="width:'+width+'%">' + element + '</div>' 
  })
  html += '</ion-row>'
  document.getElementById("ex2").innerHTML = html
}   





}
