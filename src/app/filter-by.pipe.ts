import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
