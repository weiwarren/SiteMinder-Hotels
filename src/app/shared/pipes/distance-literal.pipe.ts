import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceLiteral'
})
export class DistanceLiteralPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var exp, rounded,
      suffixes = ['km', 'M', 'G', 'T', 'P', 'E'], decimals = args ? args[0] : 1;

    if(value < 1000 || !value) {
      return '<1km';
    }

    exp = Math.floor(Math.log(value) / Math.log(1000)) || 1;

    rounded = (value / Math.pow(1000, exp) || 0).toFixed(decimals) || 0;

    return `~${rounded + suffixes[exp - 1]}`;
  }

}
