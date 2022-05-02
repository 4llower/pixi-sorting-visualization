export function randomize(v: Visualization) {
  let iterations = v.size();

  while (iterations) {
    const i = Math.floor(Math.random() * (v.size() - 1));
    const j = Math.floor(Math.random() * (v.size() - 1));

    v.swap(i, j);

    iterations--;
  }
}
