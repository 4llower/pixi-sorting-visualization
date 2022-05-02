declare interface Visualization {
  load: (data: number[]) => void;
  swap: (i: number, j: number) => void;
  randomize: () => void;
  draw: () => void;
}
