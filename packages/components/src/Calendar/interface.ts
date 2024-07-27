import React from 'react';
import { type Dayjs } from 'dayjs';

export type CalendarDate = Date | string | number | Dayjs;

export interface CalendarProps {
  className?: string;
  style?: React.CSSProperties;

  /** 自定义单元格内容 */
  cellRender?: (current: Dayjs, today: boolean) => React.ReactNode;

  /** 默认展示的日期 */
  defaultValue?: CalendarDate;

  /** 展示的日期 */
  value?: CalendarDate;

  /** 日期变化回调 */
  onChange?: (current: Dayjs) => void;

  /** 日期范围 */
  dateRange?: [CalendarDate, CalendarDate];

  /** 不可选择的日期 */
  disabledDate?: (current: Dayjs) => boolean;

  /** 是否全屏显示 */
  fullscreen?: boolean;

  /** 自定义头部内容 */
  headerRender?: (props: {
    current: Dayjs;
    onCurrentChange: (current: Dayjs) => void;
    panelMode: CalendarProps['panelMode'];
    onChangeMode: CalendarProps['onPanelChange'];
  }) => React.ReactNode;

  /** 选择日期回调 */
  onSelect?: (current: Dayjs) => void;

  /** 日期面板类型 */
  panelMode?: 'year' | 'month';

  /** 日期面板切换回调 */
  onPanelChange?: (currentDate: Dayjs, mode: string) => void;
}
