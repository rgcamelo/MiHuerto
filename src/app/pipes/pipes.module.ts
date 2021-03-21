import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';



@NgModule({
  declarations: [FiltroPipe, SafeHtmlPipe],
  exports:[
    FiltroPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }
