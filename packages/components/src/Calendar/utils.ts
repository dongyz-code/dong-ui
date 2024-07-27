import dayjs, { Dayjs } from 'dayjs';

import { type CalendarDate } from './interface';

export function getDaysInMonth(date?: CalendarDate): Dayjs[] {
  const startDate = dayjs(date).startOf('month');
  const dayInWeek = startDate.day();
  const dayItems: Dayjs[] = [];

  for (let i = 0; i < dayInWeek; i++) {
    dayItems.push(startDate.add(i - dayInWeek, 'day'));
  }

  for (let i = 0; i < 42 - dayInWeek; i++) {
    dayItems.push(startDate.add(i, 'day'));
  }

  return dayItems;
}

export const transformDayjs = (date?: CalendarDate) => {
  if (!date) {
    return undefined;
  }

  if (dayjs.isDayjs(date)) {
    return date as Dayjs;
  }

  return dayjs(date);
};

export const isSameDay = (day1: Dayjs, day2: Dayjs) => {
  const v1 = day1.format('YYYY-MM-DD');
  const v2 = day2.format('YYYY-MM-DD');
  return v1 === v2;
};

export const isSameMonth = (date1: Dayjs, date2: Dayjs) => {
  return date1.month() === date2.month() && date1.year() === date2.year();
};

export const isSameYear = (date1: Dayjs, date2: Dayjs) => {
  return date1.year() === date2.year();
};
