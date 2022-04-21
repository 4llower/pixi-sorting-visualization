import { rgb2hex } from "@pixi/utils";

const stagesRatio = 1 / 8;

export function index2color(value: number, max: number): number {
  const ratio = value / max;

  const stage = Math.floor(ratio / stagesRatio);

  const rgb = [0, 0, 0];

  const index = Math.floor(stage / 2);

  if (stage % 2 == 0) {
    rgb[index] = 1;
    rgb[index + 1] = (value / max - stage * stagesRatio) / stagesRatio;
    console.log(rgb);
    return rgb2hex(rgb.map((val) => 1 - val));
  }

  rgb[index + 1] = 1;
  rgb[index] = 1 - (value / max - stage * stagesRatio);
  console.log(rgb);
  return rgb2hex(rgb.map((val) => 1 - val));
}
