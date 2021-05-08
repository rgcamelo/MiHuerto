import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { CareTraducPipe } from './care-traduc.pipe';
import { CareIconPipe } from './care-icon.pipe';



@NgModule({
  declarations: [FiltroPipe, SafeHtmlPipe, CareTraducPipe, CareIconPipe],
  exports:[
    FiltroPipe,
    SafeHtmlPipe,
    CareTraducPipe,
    CareIconPipe
  ]
})
export class PipesModule { }
