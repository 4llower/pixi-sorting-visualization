import { GradientCircle } from "./visualizations";
import * as PIXI from "pixi.js";

import "./styles";

window.addEventListener("DOMContentLoaded", () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  document.body.appendChild(app.view);

  const container = new PIXI.Graphics();

  app.stage.addChild(container);

  const data = new Array(1000).fill(0).map((_, index) => index);

  const circle = new GradientCircle(container, data);

  circle.draw();
});
