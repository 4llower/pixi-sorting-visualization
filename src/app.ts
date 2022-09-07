import { GradientCircle } from "./visualizations";
import * as PIXI from "pixi.js";

import "./styles";

import $ from "jquery";

import { hackerLikeTextShow } from "lib";
import { bubbleSort } from "./algorithms/bubble-sort";
import { quickSort } from "algorithms/quick-sort";
import { randomize } from "algorithms/randomize";
import { mergeSort } from "algorithms/merge-sort";

const arraySize = 20000;

$(window).on("DOMContentLoaded", () => {
  const canvas = $<HTMLCanvasElement>("#pixi-sorting").get(0);

  if (!canvas) return;

  const app = new PIXI.Application({
    view: canvas,
    height: canvas.clientHeight,
    width: canvas.clientWidth,
  });

  hackerLikeTextShow(
    "#preview-text",
    "Choose sorting algorithm and visualization type!"
  );

  const container = new PIXI.Graphics();
  app.stage.addChild(container);

  const data = new Array(arraySize).fill(0).map((_, index) => index);
  const circle = new GradientCircle(container, app.view.width, app.view.height);
  circle.load(data);

  randomize(circle);
  // bubbleSort(circle);
  // quickSort(circle, 0, arraySize - 1);
  mergeSort(circle, 0, arraySize - 1);
});
