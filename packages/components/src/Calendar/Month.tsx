import React from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import useConfig from '../hooks/useConfig';
import { getDaysInMonth, isSameDay, isSameMonth } from './utils';
import { arrChunk } from '../utils';

import './style/month.scss';

import type { CalendarProps } from './interface';

type MonthProps = Pick<CalendarProps, 'cellRender' | 'onSelect' | 'disabledDate' | 'dateRange'> & {
  current: Dayjs;
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  setCurrent: (date: Dayjs) => void;
};

const Month = (props: MonthProps) => {
  const { current, selectedDate, cellRender, dateRange, onSelect, disabledDate, setSelectedDate, setCurrent } = props;
  const { prefixCls } = useConfig();

  const items = getDaysInMonth(current);
  const weekChunks = arrChunk(items, 7);

  const handleClick = (item: Dayjs) => {
    if (!isSameMonth(current, item)) {
      setCurrent(item);
      return;
    }

    if (disabledDate?.(item)) return;
    setSelectedDate?.(item);
    onSelect?.(item);
  };

  const isDisabled = (item: Dayjs) => {
    return disabledDate?.(item) || (dateRange && (item.isBefore(dateRange[0]) || item.isAfter(dateRange[1])));
  };

  return (
    <div className={`${prefixCls}-calendar-month`}>
      {weekChunks.map((week, weekIndex) => (
        <div className={`${prefixCls}-calendar-month-week`} key={weekIndex}>
          {week.map((item, dayIndex) => (
            <div
              key={weekIndex + '-' + dayIndex}
              className={classNames(`${prefixCls}-calendar-month-day`, {
                [`${prefixCls}-calendar-day-disabled`]: isDisabled(current),
                [`${prefixCls}-calendar-day-today`]: isSameDay(dayjs(), item),
                [`${prefixCls}-calendar-day-selected`]: isSameDay(selectedDate, item),
                [`${prefixCls}-calendar-day-in-month`]: isSameMonth(current, item),
              })}
              onClick={() => handleClick(item)}
            >
              <div className={`${prefixCls}-calendar-month-day-number`}>
                <div className={`${prefixCls}-calendar-month-day-number-circle`}>{item.format('D')}</div>
              </div>
              <div className={`${prefixCls}-calendar-month-day-content`}>
                {cellRender?.(item, isSameDay(selectedDate, item))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Month;
