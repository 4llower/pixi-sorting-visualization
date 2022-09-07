import { GradientCircle } from "./visualizations";
import * as PIXI from "pixi.js";

import "./styles";

import $ from "jquery";

import { hackerLikeTextShow } from "lib";
import { bubbleSort, quickSort, randomize, mergeSort } from "./algorithms";

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

  const circle = new GradientCircle(container, app.view.width, app.view.height);

  circle.load(new Array(2000).fill(0).map((_, index) => index));

  $("#quick-sort").on("click", () => {
    const arraySize = 30000;
    const data = new Array(arraySize).fill(0).map((_, index) => index);

    circle.clearQueue();
    circle.load(data);

    randomize(circle);
    quickSort(circle, 0, arraySize - 1);
  });

  $("#bubble-sort").on("click", () => {
    const arraySize = 2000;
    const data = new Array(arraySize).fill(0).map((_, index) => index);

    circle.clearQueue();
    circle.load(data);

    randomize(circle);
    bubbleSort(circle);
  });

  $("#merge-sort").on("click", () => {
    const arraySize = 20000;
    const data = new Array(arraySize).fill(0).map((_, index) => index);

    circle.clearQueue();
    circle.load(data);
    randomize(circle);

    mergeSort(circle, 0, arraySize - 1);
  });
});
