import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'careTraduc'
})
export class CareTraducPipe implements PipeTransform {

  transform(value: string): string {
    
    if (value == 'water') {
      return 'Control de Riego';
    }

    if(value == 'manure'){
      return 'Control de Abono'
    }

    if(value == 'plague'){
      return 'Control de Plagas'
    }

    if(value == 'prune'){
      return 'Poda'
    }

    if(value == 'crop'){
      return 'Cosecha'
    }

    if(value == 'eye'){
      return 'Observación'
    }

    if(value == 'planted'){
      return 'Dia de Plantación'
    }


  }

}
