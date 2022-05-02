import * as PIXI from "pixi.js";

import { compressData } from "./utils";
import tinygradient from "tinygradient";

const ticker = PIXI.Ticker.shared;

export class GradientCircle implements Visualization {
  private data: number[];
  private graphics: PIXI.Graphics;
  private globalContainer: PIXI.Graphics;
  private colors: number[];

  constructor(globalContainer: PIXI.Graphics, data?: number[]) {
    this.data = [];

    if (data) {
      this.data = compressData([...data]);
    }

    this.globalContainer = globalContainer;

    this.graphics = new PIXI.Graphics();
    this.globalContainer.addChild(this.graphics);

    if (this.data.length) {
      this.loadColors(this.data.length);
    }
    // TODO: remove
    // this.randomize();
  }

  loadColors(steps: number) {
    const gradient = tinygradient("blue", "green", "red");
    this.colors = gradient
      .hsv(steps, "long")
      .map((grad) => +("0x" + grad.toHex()));
  }

  load(data: number[]) {
    this.data = compressData([...data]);
    this.loadColors(this.data.length);
  }
  swap(i: number, j: number) {}
  randomize() {
    this.data.sort(() => Math.random() - Math.random());
  }

  draw() {
    this.graphics.clear();
    for (let i = 0; i < this.data.length; ++i) {
      this.graphics
        .lineStyle({ color: this.colors[this.data[i]], width: 1 })
        .moveTo(0, i)
        .lineTo(1000, i);
    }
  }
}
