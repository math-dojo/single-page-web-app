import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negate'
})
export class NegatePipe implements PipeTransform {

  transform(value: boolean): boolean {
    return !value;
  }

}
