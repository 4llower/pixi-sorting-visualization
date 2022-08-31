export function bubbleSort(v: Visualization) {
  for (let i = 0; i < v.size(); ++i) {
    for (let j = i + 1; j < v.size(); ++j) {
      if (v.isBigger(i, j)) {
        v.swap(i, j);
      }
    }
  }
}
