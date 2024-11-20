export interface TweenTarget {
  [key: string]: number | unknown;
}

export interface TweenableProperties {
  [key: string]: number;
}

export interface TweenConfig {
  easing?: (t: number) => number;
  delay?: number;
  repeat?: number;
  yoyo?: boolean;
}

export interface TimelineConfig {
  paused?: boolean;
  repeat?: number;
}
