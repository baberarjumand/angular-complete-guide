import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number, ...args: unknown[]): unknown {
    if (value.length > limit) {
      return value.substring(0, limit) + "...";
    }
    return value;
  }
}
