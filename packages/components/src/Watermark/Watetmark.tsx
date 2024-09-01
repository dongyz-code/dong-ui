import React, { useEffect, useState } from 'react';
import { merge } from 'lodash-es';
import { drawWatermark } from './canvas';
import { DEFAULT_WATERMARK_OPTIONS } from './constant';

import type { WatermarkProps } from './interface';

const Watermark: React.FC<WatermarkProps> = ({
  style,
  classsName,
  content,
  image,
  fontStyle,
  width,
  height,
  rotate,
  gap = DEFAULT_WATERMARK_OPTIONS['gap'],
  zIndex,
  children,
}) => {
  const [base64, setBase64] = useState('');
  const [size, setSize] = useState({ width: width || 0, height: height || 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const _options = merge(
      {
        content,
        image,
        fontStyle,
        width,
        height,
        rotate,
        gap,
        zIndex,
      },
      DEFAULT_WATERMARK_OPTIONS
    );
    drawWatermark({
      container: containerRef.current!,
      options: _options,
    })?.then((res) => {
      setBase64(res.base64Url);
      setSize({ width: res.width, height: res.height });
    });
  }, [content, image, fontStyle, width, height, rotate, gap, zIndex]);

  return (
    <div ref={containerRef} style={style} className={classsName}>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: zIndex,
          pointerEvents: 'none',
          backgroundPosition: '0 0',
          backgroundSize: `${gap![0] + size.width}px ${gap![1] + size.height}px`,
          backgroundRepeat: 'repeat',
          backgroundImage: `url(${base64})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Watermark;
