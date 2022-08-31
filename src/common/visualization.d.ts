declare interface Visualization {
  load: (data: number[]) => void;
  swap: (i: number, j: number) => void;
  isBigger: (i: number, j: number) => boolean;
  getValue: (index: number) => number;
  size(): number;
  isReady(): boolean;
  clearQueue(): void;
}
