import { GradientCircle } from "./visualizations";
import * as PIXI from "pixi.js";

import "./styles";
import { bubbleSort } from "./algorithms/bubble-sort";

window.addEventListener("DOMContentLoaded", () => {
  const { innerHeight, innerWidth } = window;

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  document.body.appendChild(app.view);

  const container = new PIXI.Graphics();

  app.stage.addChild(container);

  const data = new Array(1700).fill(0).map((_, index) => index);

  const circle = new GradientCircle(container, innerWidth, innerHeight, data);

  bubbleSort(circle);
});
