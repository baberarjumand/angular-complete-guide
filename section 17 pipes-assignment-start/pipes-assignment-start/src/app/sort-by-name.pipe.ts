import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sortByName",
})
export class SortByNamePipe implements PipeTransform {
  transform(value: any, propName: string): unknown {
    return value.sort((a, b) =>
      a[propName] > b[propName] ? 1 : b[propName] > a[propName] ? -1 : 0
    );
  }
}
