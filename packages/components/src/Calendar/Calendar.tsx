import React from 'react';
import dayjs from 'dayjs';
import useConfig from '../hooks/useConfig';
import classNames from 'classnames';
import { transformDayjs } from './utils';

import Header from './Header';
import WeekList from './WeekList';
import Year from './Year';
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
    panelMode = 'month',
    onSelect,
    onPanelChange,
  } = props;
  const { prefixCls } = useConfig();

  const [current, setCurrent] = useMergeValue(dayjs(), {
    defaultValue: transformDayjs(defaultValue),
  });

  const [selectedDate, setSelectedDate] = useMergeValue(dayjs(), {
    defaultValue: transformDayjs(defaultValue),
    value: transformDayjs(value),
    onChange,
  });

  const [panelModeValue, setPanelModeValue] = useMergeValue(panelMode, {
    defaultValue: panelMode,
  });

  return (
    <div className={classNames(`${prefixCls}-calendar`, className)} style={{ ...style }}>
      <Header
        current={current}
        setCurrent={setCurrent}
        panelMode={panelModeValue}
        onPanelChange={onPanelChange}
        setPanelModeValue={setPanelModeValue}
        setSelectedDate={setSelectedDate}
        headerRender={headerRender}
      />

      <div className={`${prefixCls}-calendar-body`}>
        {panelModeValue === 'year' && <Year current={current} setCurrent={setCurrent} />}

        {panelModeValue === 'month' && (
          <>
            <div className={`${prefixCls}-calendar-body-week`}>
              <WeekList />
            </div>
            <Month
              current={current}
              cellRender={cellRender}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onSelect={onSelect}
              setCurrent={setCurrent}
              disabledDate={disabledDate}
              dateRange={dateRange}
            />
          </>
        )}
      </div>
      <div className={`${prefixCls}-calendar-footer`}></div>
    </div>
  );
};

export default Calendar;
