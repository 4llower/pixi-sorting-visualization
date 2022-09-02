import * as PIXI from "pixi.js";

import tinygradient from "tinygradient";

import { getIndexedData } from "./utils";

const ticker = PIXI.Ticker.shared;

const delay = 0;
const queueLoadPerIterations = 500;
const bufferSize = 3000000;

export class GradientCircle implements Visualization {
  private data: number[];
  private currentData: number[];
  private graphics: PIXI.Graphics;
  private globalContainer: PIXI.Graphics;
  private colors: number[];
  private height: number;
  private width: number;
  private lastTS: number;
  private queue: [number, number][];
  private qAddPointer: number;
  private qCheckPointer: number;

  constructor(globalContainer: PIXI.Graphics, width: number, height: number) {
    this.data = [];
    this.currentData = [];

    this.lastTS = 0;
    this.colors = [];

    this.height = height;
    this.width = width;

    this.globalContainer = globalContainer;

    this.graphics = new PIXI.Graphics();
    this.globalContainer.addChild(this.graphics);

    if (this.data.length) {
      this.loadColors(this.data.length);
    }
    // TODO: remove

    this.qAddPointer = 0;
    this.qCheckPointer = 0;
    this.queue = new Array(bufferSize).fill([-1, -1]);

    ticker.add(() => this.draw());
  }

  public isReady() {
    return !!this.queue.length;
  }

  public clearQueue() {
    this.qAddPointer = 0;
    this.qCheckPointer = 0;
    this.queue.fill([-1, -1]);
  }

  public loadColors(steps: number) {
    const gradient = tinygradient("red", "blue", "green");

    this.colors = gradient
      .hsv(steps, "long")
      .map((grad) => +("0x" + grad.toHex()));

    for (let i = 0; i < Math.floor(steps / 4); ++i) {
      const value = this.colors.shift();

      if (value) this.colors.push(value);
    }
  }

  public load(data: number[]) {
    this.data = getIndexedData([...data]);
    this.loadColors(this.data.length);
    this.currentData = [...this.data];
  }

  swap(i: number, j: number) {
    const temp = this.currentData[i];

    this.currentData[i] = this.currentData[j];
    this.currentData[j] = temp;

    if (this.qAddPointer === bufferSize) {
      this.qAddPointer = 0;
    }

    this.queue[this.qAddPointer++] = [i, j];
  }

  getValue(index: number) {
    return this.currentData[index];
  }

  isBigger(i: number, j: number) {
    return this.currentData[i] > this.currentData[j];
  }

  size() {
    return this.data.length;
  }

  loadFromQueue() {
    if (!this.queue.length) return;

    for (let iter = 0; iter < queueLoadPerIterations; ++iter) {
      if (this.qCheckPointer === bufferSize) {
        this.qCheckPointer = 0;
      }

      const [i, j] = this.queue[this.qCheckPointer++];

      if (i === -1) {
        return;
      }

      this.queue[this.qCheckPointer - 1] = [-1, -1];

      [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }
  }

  getColor(value: number) {
    if (value > this.colors.length)
      throw new Error("Gradation couldn't more than number of color steps");

    return this.colors[value];
  }

  draw() {
    const timestamp = Date.now();
    if (timestamp - this.lastTS < delay) return;

    this.lastTS = timestamp;

    this.graphics.clear();

    this.loadFromQueue();

    const [cx, cy] = this.getCenter();
    const radius = this.getRadius();

    for (let i = 0; i < this.data.length; ++i) {
      const angle = 2 * Math.PI * (i / this.data.length);

      this.graphics
        .lineStyle({ color: this.getColor(this.data[i]), width: 2 })
        .moveTo(cx, cy)
        .lineTo(Math.cos(angle) * radius + cx, Math.sin(angle) * radius + cy);
    }
  }

  private getCenter(): [number, number] {
    return [Math.floor(this.width / 2), Math.floor(this.height / 2)];
  }

  private getRadius(): number {
    return Math.floor(Math.min(this.height, this.width) / 2.5);
  }
}
