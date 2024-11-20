import { Tween } from './tween';
import { TimelineConfig } from './types';

export class Timeline {
  private tweens: Tween[] = [];
  private currentTime = 0;
  private _paused = false;

  constructor(private config: TimelineConfig = {}) {}

  add(tween: Tween, position?: number): this {
    if (position !== undefined) {
      tween.startTime = position;
    } else {
      tween.startTime = this.currentTime;
    }
    this.tweens.push(tween);
    return this;
  }

  play(): this {
    this._paused = false;
    return this;
  }

  pause(): this {
    this._paused = true;
    return this;
  }

  update(deltaTime: number): void {
    if (this._paused) return;

    this.currentTime += deltaTime;

    for (const tween of this.tweens) {
      if (this.currentTime >= tween.startTime) {
        tween.update(this.currentTime - tween.startTime);
      }
    }
  }
}
