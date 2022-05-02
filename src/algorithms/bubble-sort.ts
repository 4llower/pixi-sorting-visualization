import { randomize } from "./randomize";

export function bubbleSort(v: Visualization) {
  v.clearQueue();

  randomize(v);

  for (let i = 0; i < v.size(); ++i) {
    for (let j = i + 1; j < v.size(); ++j) {
      if (v.compare(i, j)) {
        v.swap(i, j);
      }
    }
  }
}
