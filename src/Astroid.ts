import { Game } from "./Game";

export class Astroid {
  game: Game;
  x: number;
  y: number;
  image: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  radius: number;
  speed: number;
  free: boolean;
  angle: number;
  va: number;
  constructor(game: Game) {
    this.game = game;
    this.radius = 75;
    this.x = 0 - this.radius;
    this.y = Math.random() * this.game.height;
    this.image = document.querySelector("#astroid") as HTMLImageElement;
    this.spriteWidth = 150;
    this.spriteHeight = 155;

    this.speed = Math.random() * 1.5 + 0.1;
    this.free = true;
    this.angle = 0;
    this.va = Math.random() * 0.02 - 0.01;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.free) {
      //   ctx.beginPath();
      //   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      //   ctx.stroke();
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(
        this.image,
        -this.spriteWidth * 0.5,
        -this.spriteHeight * 0.5,
        this.spriteWidth,
        this.spriteHeight
      );
      ctx.restore();
    }
  }
  update() {
    if (!this.free) {
      this.angle += this.va;
      this.x += this.speed;
      if (this.x > this.game.width - this.radius) {
        this.reset();
        const explosion = this.game.getFreeExplosion();
        explosion?.start(this.x, this.y, 0);
      }
    }
  }
  reset() {
    this.free = true;
  }
  start() {
    this.free = false;
    this.x = 0 - this.radius;
    this.y = Math.random() * this.game.height;
  }
}
