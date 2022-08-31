import { GradientCircle } from "./visualizations";
import * as PIXI from "pixi.js";

import "./styles";

import { bubbleSort } from "./algorithms/bubble-sort";
import { quickSort } from "algorithms/quick-sort";
import { randomize } from "algorithms/randomize";

const arraySize = 20000;

window.addEventListener("DOMContentLoaded", () => {
  const { innerHeight, innerWidth } = window;

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  document.body.appendChild(app.view);

  const container = new PIXI.Graphics();

  app.stage.addChild(container);

  const data = new Array(arraySize).fill(0).map((_, index) => index);

  const circle = new GradientCircle(container, innerWidth, innerHeight);

  circle.load(data);
  randomize(circle);

  // bubbleSort(circle);
  quickSort(circle, 0, arraySize - 1);
});
