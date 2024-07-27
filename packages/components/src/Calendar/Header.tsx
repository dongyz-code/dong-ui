import React from 'react';
import useConfig from '../hooks/useConfig';
import dayjs, { type Dayjs } from 'dayjs';

import './style/header.scss';
import { CalendarProps } from './interface';
import classNames from 'classnames';

type PanelMode = NonNullable<CalendarProps['panelMode']>;

type HeaderProps = Pick<CalendarProps, 'panelMode' | 'onPanelChange' | 'headerRender'> & {
  current: Dayjs;
  setCurrent: (val: Dayjs) => void;
  setPanelModeValue: (val: PanelMode) => void;
  setSelectedDate: (val: Dayjs) => void;
};

const modeList: Array<{ key: PanelMode; label: string }> = [
  {
    key: 'year',
    label: '年',
  },
  {
    key: 'month',
    label: '月',
  },
];

const Header = (props: HeaderProps) => {
  const { prefixCls } = useConfig();

  const { panelMode, onPanelChange, current, setCurrent, setPanelModeValue, setSelectedDate, headerRender } = props;

  const handlePrev = () => {
    const prev = current.add(-1, panelMode);
    setCurrent(prev);
  };

  const handleNext = () => {
    const next = current.add(1, panelMode);
    setCurrent(next);
  };

  const handleToday = () => {
    setCurrent(dayjs());
    setSelectedDate(dayjs());
  };

  const handlePanelChange = (mode: PanelMode) => {
    onPanelChange?.(current, mode);
    setPanelModeValue(mode);
  };

  const DefaultHeaderRender = () => {
    return (
      <>
        <div className={`${prefixCls}-calendar-header-left`}>
          <div className={`${prefixCls}-calendar-header-left-actions`}>
            <button className={`${prefixCls}-calendar-header-left-prev`} onClick={handlePrev}>
              &lt;
            </button>
            <span>{current.format('YYYY年MM月')}</span>
            <button className={`${prefixCls}-calendar-header-left-next`} onClick={handleNext}>
              &gt;
            </button>
          </div>

          <button className={`${prefixCls}-calendar-header-left-today`} onClick={handleToday}>
            今天
          </button>
        </div>
        <div className={`${prefixCls}-calendar-header-right`}>
          {modeList.map((mode) => (
            <button
              key={mode.key}
              className={classNames(`${prefixCls}-calendar-header-right-btn`, {
                [`${prefixCls}-calendar-header-right-btn-active`]: mode.key === panelMode,
              })}
              onClick={() => handlePanelChange(mode.key)}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={`${prefixCls}-calendar-header`}>
      {headerRender ? (
        headerRender({
          current,
          panelMode,
          onCurrentChange: setCurrent,
          onChangeMode: setSelectedDate,
        })
      ) : (
        <DefaultHeaderRender />
      )}
    </div>
  );
};

export default Header;
