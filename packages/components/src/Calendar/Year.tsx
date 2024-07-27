import React from 'react';
import useConfig from '../hooks/useConfig';
import { arrChunk } from '../utils';
import classNames from 'classnames';

import './style/year.scss';
import type { Dayjs } from 'dayjs';

const yearMonthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

type YearProps = {
  current: Dayjs;
  setCurrent: (val: Dayjs) => void;
};

const Year = (props: YearProps) => {
  const { prefixCls } = useConfig();
  const { current, setCurrent } = props;

  const currentMonth = current.get('month');

  const monthChunks = arrChunk(yearMonthList, 3);

  const handleClick = (monthNum: number) => {
    setCurrent(current.set('month', monthNum));
  };

  return (
    <div className={`${prefixCls}-calendar-year`}>
      {monthChunks.map((month, index) => (
        <div key={index} className={`${prefixCls}-calendar-year-month-row`}>
          {month.map((monthNum) => (
            <div
              key={index + '' + monthNum}
              className={classNames(`${prefixCls}-calendar-year-month`, {
                [`${prefixCls}-calendar-year-month-active`]: currentMonth === monthNum,
                [`${prefixCls}-calendar-year-month-today`]: currentMonth === monthNum,
              })}
              onClick={() => handleClick(monthNum)}
            >
              {monthNum + 1}月
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Year;
