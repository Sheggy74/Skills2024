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

    // Количество минут в одном дне
    const minutesPerDay = 1440; // 24 * 60

    // Вычисляем количество полных дней
    let days = Math.floor(totalMinutes / minutesPerDay);

    // Оставшиеся минуты после вычитания дней
    let remainingMinutes = totalMinutes - days * minutesPerDay;

    // Вычисляем количество полных часов
    let hours = Math.floor(remainingMinutes / 60);

    // Вычисляем минуты с округлением
    let minutes = Math.round(remainingMinutes - hours * 60);

    // Если округление даёт 60 минут, то прибавляем один час
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    // Если часов стало 24, то прибавляем один день
    if (hours === 24) {
      hours = 0;
      days++;
    }

    return days > 0 ? `${days} дн. ${hours} ч. ${minutes} мин.` : `${hours} ч. ${minutes} мин.`;
  }
}

