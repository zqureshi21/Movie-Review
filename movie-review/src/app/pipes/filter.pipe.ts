import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string): any[] {
    let results : any[] = [];
    if (value.length === 0 || filterString === ''){
      return value;
    }
    let input = filterString.toUpperCase()
    for (let i of value){
      if ((i['title'].toUpperCase().indexOf(input) > -1) || (i['genre'].toUpperCase().indexOf(input) > -1)){
        results.push(i);
      }
    }
    return results;
  }
}
