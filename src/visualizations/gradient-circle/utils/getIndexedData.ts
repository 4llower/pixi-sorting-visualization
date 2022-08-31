export function getIndexedData(data: number[]): number[] {
  const copy = [...data].sort((a, b) => (a > b ? 1 : -1));
  const saved: { [key: number]: number } = {};

  let index = 0;
  for (const elem of copy) {
    saved[elem] = index;
    index++;
  }

  const result: number[] = [];
  for (const elem of data) {
    result.push(saved[elem]);
  }

  return result;
}
