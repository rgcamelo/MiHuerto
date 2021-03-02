import { Component, OnInit } from '@angular/core';
import { SeedService } from '../../services/seed.service';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.page.html',
  styleUrls: ['./seed.page.scss'],
})
export class SeedPage implements OnInit {

  seeds:Seed[] = [];
  constructor(private seedService:SeedService) { }

  ngOnInit() {
    this.cargarSeeds();
  }

  cargarSeeds(){
    this.seedService.getSeeds().subscribe( res =>{
      this.seeds.push(...res.data);
    })
  }

}
