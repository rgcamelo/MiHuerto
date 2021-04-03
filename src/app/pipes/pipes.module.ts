import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { CareTraducPipe } from './care-traduc.pipe';



@NgModule({
  declarations: [FiltroPipe, SafeHtmlPipe, CareTraducPipe],
  exports:[
    FiltroPipe,
    SafeHtmlPipe,
    CareTraducPipe,
  ]
})
export class PipesModule { }
