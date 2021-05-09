import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'careIcon'
})
export class CareIconPipe implements PipeTransform {

  transform(value: string, type?:string): string {
    
    if (value == 'water') {
      return './assets/icon/regadera.svg';
    }

    if(value == 'manure'){
      return './assets/icon/fertilizer.svg'
    }

    if(value == 'plague'){
      return './assets/icon/plagas.svg'
    }

    if(value == 'prune'){
      return './assets/icon/tijeras-de-podar.svg'
    }

    if(value == 'crop'){
      return './assets/icon/verduras.svg'
    }

    if(value == 'eye'){
      return './assets/icon/lista-de-verificacion.svg'
    }

    if(value == 'planted'){
      if(type == 'bed'){
        return '/assets/icon/bandejas.svg'
      }
      if(type == 'terrace'){
        return '/assets/icon/bancal.svg'
      }
      if(type == 'furrow'){
        return '/assets/icon/surco.svg'
      }
    }


  }

}
