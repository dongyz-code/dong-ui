import React from 'react';
import useConfig from '../hooks/useConfig';

const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const WeekList = (props: {}) => {
  const { prefixCls } = useConfig();

  return (
    <>
      {weekdays.map((day, index) => (
        <div key={index} className={`${prefixCls}-calendar-week-item`}>
          {day}
        </div>
      ))}
    </>
  );
};

export default WeekList;
