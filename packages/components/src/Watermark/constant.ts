import type { WatermarkOptions } from './interface';

export const DEFAULT_WATERMARK_OPTIONS: WatermarkOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  height: 100,
  gap: [0, 0],
  fontStyle: {
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
  },
};
