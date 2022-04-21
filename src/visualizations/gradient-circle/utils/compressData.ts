export function compressData(data: number[]): [number[], number] {
  const copy = [...data].sort((a, b) => (a > b ? 1 : -1));
  const saved = {};

  let index = 0;
  for (const elem of copy) {
    saved[elem] = index;
    index++;
  }

  const result = [];
  for (const elem of data) {
    result.push(saved[elem]);
  }

  return [result, copy[copy.length - 1]];
}
