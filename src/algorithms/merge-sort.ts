export function mergeSort(v: Visualization, left: number, right: number) {
  if (left === right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSort(v, left, mid);
  mergeSort(v, mid + 1, right);

  let first = left;
  let second = mid + 1;

  const values: number[] = [];

  while (true) {
    if (first > mid && second > right) break;

    if (second > right) {
      values.push(first);
      first++;
      continue;
    }

    if (first > mid) {
      values.push(second);
      second++;
      continue;
    }

    if (v.isBigger(first, second)) {
      values.push(second);
      second++;
      continue;
    }

    values.push(first);
    first++;
  }

  const positionValue: number[] = [];
  const valuePosition: { [key: number]: number } = {};

  for (let i = left; i <= right; ++i) {
    positionValue.push(i);
    valuePosition[i] = i - left;
  }

  const loadQueue: [number, number][] = [];

  for (let i = 0; i < values.length; ++i) {
    const actual = positionValue[i];
    const expected = values[i];

    if (actual === expected) continue;

    const whereExpectedValue = valuePosition[expected];
    delete valuePosition[expected];

    loadQueue.push([actual, expected]);

    positionValue[i] = expected;
    positionValue[whereExpectedValue] = actual;
    valuePosition[actual] = whereExpectedValue;
  }

  while (true) {
    const pos: [number, number] | undefined = loadQueue.pop();

    if (!pos) break;

    v.swap(...pos);
  }
}

// 2 3 4 5:
// 2 - 1, 3 - 2, 4 - 3, 5 - 4
// 5 4 2 3:
// 5 - 1, 4 - 2, 2 - 3, 3 - 4
