function partition(v: Visualization, left: number, right: number): number {
  const mid = Math.floor((left + right) / 2);

  const value = v.getValue(mid);

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
