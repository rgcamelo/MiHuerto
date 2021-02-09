import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroundService } from '../../services/ground.service';

@Component({
  selector: 'app-beds',
  templateUrl: './beds.page.html',
  styleUrls: ['./beds.page.scss'],
})
export class BedsPage implements OnInit {

  reference:string = '';
  beds: Bed[] =[];

  constructor(private groundService:GroundService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.cargarGrounds();
  }

  cargarGrounds(){
    this.reference = this.route.snapshot.paramMap.get('id').toString();
    console.log(this.reference);
    this.groundService.getBeds(this.reference).subscribe(resp =>{
      this.beds.push(...resp.data);
      console.log(this.beds);
    });
  }

}
