import { GradientCircle } from "./visualizations";
import * as PIXI from "pixi.js";

import "./styles";
import { bubbleSort } from "./algorithms/bubble-sort";

const arraySize = 2000;

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

  bubbleSort(circle);
});
