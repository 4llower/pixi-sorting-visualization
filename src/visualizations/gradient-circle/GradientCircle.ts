import * as PIXI from "pixi.js";
import { index2color } from "./utils";
import { compressData } from "./utils/compressData";

const ticker = PIXI.Ticker.shared;

export class GradientCircle implements Visualization {
  private data: number[];
  private graphics: PIXI.Graphics;
  private globalContainer: PIXI.Graphics;
  private max: number = 1;

  constructor(globalContainer: PIXI.Graphics, data?: number[]) {
    this.data = [];

    if (data) {
      [this.data, this.max] = compressData([...data]);
    }

    this.globalContainer = globalContainer;

    this.graphics = new PIXI.Graphics();
    this.globalContainer.addChild(this.graphics);
  }

  load(data: number[]) {
    [this.data, this.max] = compressData([...data]);
  }
  swap(i: number, j: number) {}
  randomize() {}

  draw() {
    for (let i = 0; i < this.data.length; ++i) {
      const color = index2color(this.data[i], this.max);

      this.graphics.lineStyle({ color, width: 1 }).moveTo(0, i).lineTo(1000, i);
    }
  }
}
