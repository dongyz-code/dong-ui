import React from 'react';
import { getDaysInMonth } from './utils';
import { type CalendarDate } from './interface';
import { arrChunk } from '../utils/array';
import useConfig from '../hooks/useConfig';

const Month = (props: { date: CalendarDate }) => {
  const { date } = props;
  const { prefixCls } = useConfig();

  const items = getDaysInMonth(date);
  const itemsByWeek = arrChunk(items, 7);

  return (
    <div>
      {itemsByWeek.map((week, weekIndex) => (
        <div className={`${prefixCls}-calendar-month-week`} key={weekIndex}>
          {week.map((item, dayIndex) => (
            <div key={weekIndex + '-' + dayIndex} className={`${prefixCls}-calendar-month-day`}>
              {item.format('D')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Month;
