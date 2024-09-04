import type { WatermarkOptions } from './interface';

function measureTextSize(ctx: CanvasRenderingContext2D, lines: string[], rotate: number) {
  let width = 0;
  let height = 0;
  const angle = (rotate * Math.PI) / 180;

  const lineSize = lines.map((text) => {
    const metrics = ctx.measureText(text);
    const textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

    if (metrics.width > width) {
      width = metrics.width;
    }

    height += textHeight;

    return {
      width: metrics.width,
      height: textHeight,
    };
  });

  return {
    originalWidth: width,
    originalHeight: height,
    width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
    height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
    lineSize,
  };
}

export function drawWatermark({
  container,
  options,
}: {
  container?: HTMLElement;
  options: NonNullable<WatermarkOptions>;
}) {
  if (!container) {
    return;
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  const { content = [], image, fontStyle, gap, rotate } = options;
  const ratio = window.devicePixelRatio || 1;

  function resizeCanvas(itemStyle: { width: number; height: number }) {
    const canvasWidth = itemStyle.width + gap![0];
    const canvasHeight = itemStyle.height + gap![1];

    /** 根据设备像素比调整 canvas 大小 */
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx.scale(ratio, ratio);
    ctx.rotate((Math.PI * rotate!) / 180);
  }

  async function drawText() {
    const { fontFamily, fontWeight, fontSize, color } = fontStyle!;
    const measureSize = measureTextSize(ctx, content, rotate!);
    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;

    resizeCanvas({ width, height });

    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.fillStyle = color!;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    // 在行宽的一半的地方开始绘制文字，行内每个文字的位置是行高的一半 * index。
    for (let i = 0; i < content!.length; i++) {
      const text = content![i];
      const lineSize = measureSize.lineSize[i];
      const x = -lineSize.width / 2;
      const y = -measureSize.height / 2 + lineSize.height * i;

      ctx.fillText(text, x, y, options.width || measureSize.originalWidth);
    }

    return { base64Url: canvas.toDataURL(), width, height };
  }

  async function drawImage() {
    return new Promise<{ base64Url: string; width: number; height: number }>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';

      img.onload = () => {
        let { width, height } = options;

        if (!width || !height) {
          const imgWidth = img.width;
          const imgHeight = img.height;

          if (width && !height) {
            height = (width / imgWidth) * imgHeight;
          } else if (!width && height) {
            width = (height / imgHeight) * imgWidth;
          } else {
            width = imgWidth;
            height = imgHeight;
          }
        }

        resizeCanvas({ width, height });

        ctx.drawImage(img, -width / 2, -height / 2, width, height);

        resolve({ base64Url: canvas.toDataURL(), width, height });
      };

      img.onerror = () => {
        return drawText();
      };

      img.src = image!;
    });
  }

  return image ? drawImage() : drawText();
}
