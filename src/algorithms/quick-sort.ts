function partition(v: Visualization, left: number, right: number): number {
  const value = v.getValue(
    left + Math.floor((right - left + 1) * Math.random())
  );

  let i = left;
  let j = right;

  while (i <= j) {
    while (v.getValue(i) < value) {
      i++;
    }
    while (v.getValue(j) > value) {
      j--;
    }
    if (i >= j) {
      break;
    }
    v.swap(i, j);
    i++;
    j--;
  }
  return j;
}

export function quickSort(v: Visualization, left: number, right: number) {
  if (left >= right) return;

  const reliance = partition(v, left, right);

  quickSort(v, left, reliance);
  quickSort(v, reliance + 1, right);
}
