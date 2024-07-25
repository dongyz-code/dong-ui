import React from 'react';
import dayjs from 'dayjs';
import useConfig from '../hooks/useConfig';
import classNames from 'classnames';

import WeekList from './WeekList';
import Month from './Month';

import type { CalendarProps } from './interface';
import './style/index.scss';
import { useMergeValue } from '../hooks/useMergeValue';

const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    className,
    style,
    defaultValue = dayjs(),
    value,
    onChange,
    cellRender,
    dateRange,
    disabledDate,
    headerRender,
    onSelect,
    panelMode,
    onPanelChange,
  } = props;
  const { prefixCls } = useConfig();

  const [current, setCurrent] = useMergeValue(dayjs(), {
    defaultValue,
    value,
  });

  return (
    <div className={classNames(`${prefixCls}-calendar`, className)} style={{ ...style }}>
      <div className={`${prefixCls}-calendar-header`}></div>
      <div className={`${prefixCls}-calendar-body`}>
        <div className={`${prefixCls}-calendar-body-week`}>
          <WeekList />
        </div>
        <Month date={current} />
      </div>
      <div className={`${prefixCls}-calendar-footer`}></div>
    </div>
  );
};

export default Calendar;
