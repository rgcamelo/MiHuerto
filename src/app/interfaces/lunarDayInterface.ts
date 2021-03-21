interface LunarObject {
  monthName: string;
  firstDayMonth: string;
  daysMonth: string;
  nameDay: string[];
  nameMonth: string[];
  phase: Phase;
  month: number;
  year: number;
  receivedVariables: ReceivedVariables;
  lang: string;
  language: string;
  title: string[];
  nextFullMoon: string;
  autor: string;
  version: string;
}

interface ReceivedVariables {
  lang: string;
  month: string;
  year: string;
  size: string;
  lightColor: string;
  shadeColor: string;
  texturize: string;
  LDZ: string;
}

interface LunarVariables {
    lang: string;
    month: string;
    year: string;
    size: string;
    lightColor: string;
    shadeColor: string;
    texturize: string;
  }

interface Phase {
  '1': _1;
  '2': _1;
  '3': _1;
  '4': _1;
  '5': _5;
  '6': _1;
  '7': _1;
  '8': _1;
  '9': _1;
  '10': _1;
  '11': _1;
  '12': _1;
  '13': _5;
  '14': _1;
  '15': _1;
  '16': _1;
  '17': _1;
  '18': _1;
  '19': _1;
  '20': _1;
  '21': _5;
  '22': _1;
  '23': _1;
  '24': _1;
  '25': _1;
  '26': _1;
  '27': _1;
  '28': _5;
  '29': _1;
  '30': _1;
  '31': _1;
}

interface _5 {
  phaseName: string;
  isPhaseLimit: number;
  lighting: number;
  svg: string;
  svgMini: string;
  timeEvent: string;
  dis: number;
  dayWeek: number;
  npWidget: string;
}

interface _1 {
  phaseName: string;
  isPhaseLimit: boolean;
  lighting: number;
  svg: string;
  svgMini: boolean;
  timeEvent: boolean;
  dis: number;
  dayWeek: number;
  npWidget: string;
}

