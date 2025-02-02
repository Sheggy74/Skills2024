import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    if (totalMinutes == null || isNaN(totalMinutes)) {
      return '';
    }

    // Вычисляем количество часов
    const hours = Math.floor(totalMinutes / 60);

    // Остаток минут, округляем до ближайшего целого
    let minutes = Math.round(totalMinutes - hours * 60);

    // Если округление даёт 60 минут, то прибавляем час
    if (minutes === 60) {
      minutes = 0;
      return `${hours + 1} ч. ${minutes} мин.`;
    }

    return `${hours} ч. ${minutes} мин.`;
  }
}

