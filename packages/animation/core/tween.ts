import { TweenConfig, TweenTarget, TweenableProperties } from './types';

export class Tween {
  private startValues: Record<string, number> = {};
  private endValues: Record<string, number> = {};
  private currentTime = 0;
  startTime = 0;

  constructor(
    private target: TweenTarget,
    private duration: number,
    private properties: TweenableProperties,
    private config: TweenConfig = {}
  ) {
    this.initializeValues();
  }

  private initializeValues(): void {
    for (const prop in this.properties) {
      if (typeof this.target[prop] === 'number') {
        this.startValues[prop] = this.target[prop] as number;
        this.endValues[prop] = this.properties[prop] as number;
      }
    }
  }

  update(deltaTime: number): void {
    this.currentTime = Math.min(this.duration, this.currentTime + deltaTime);
    const progress = this.currentTime / this.duration;

    const easing = this.config.easing || ((t: number) => t);
    const easedProgress = easing(progress);

    for (const prop in this.startValues) {
      const start = this.startValues[prop];
      const end = this.endValues[prop];
      this.target[prop] = start + (end - start) * easedProgress;
    }
  }

  reset(): void {
    this.currentTime = 0;
    for (const prop in this.startValues) {
      this.target[prop] = this.startValues[prop];
    }
  }
}
