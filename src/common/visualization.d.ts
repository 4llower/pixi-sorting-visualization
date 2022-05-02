declare interface Visualization {
  load: (data: number[]) => void;
  swap: (i: number, j: number) => void;
  compare: (i: number, j: number) => boolean;
  size(): number;
  isReady(): boolean;
  clearQueue(): void;
}
