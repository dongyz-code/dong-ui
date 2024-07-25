import dayjs, { Dayjs } from 'dayjs';
import { type CalendarDate } from './interface';

export function getDaysInMonth(date: CalendarDate): Dayjs[] {
  const startDate = dayjs(date).startOf('month');
  const dayInWeek = startDate.day();
  const dayItems: Dayjs[] = [];

  for (let i = 0; i < dayInWeek; i++) {
    dayItems.push(startDate.add(i - dayInWeek + 1, 'day'));
  }

  for (let i = dayInWeek; i < 42; i++) {
    dayItems.push(startDate.add(i, 'day'));
  }

  return dayItems;
}
