import { Game } from "./Game";

export class Explosion {
  game: Game;
  x: number;
  y: number;
  speed: number;
  image: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  free: boolean;
  frameX: number;
  frameY: number;
  maxFrame: number;
  animationTimer: number;
  animationInterval: number;
  sound: HTMLAudioElement;
  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.image = document.querySelector("#explosions") as HTMLImageElement;
    this.spriteWidth = 300;
    this.spriteHeight = 300;
    this.free = true;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 3);
    this.maxFrame = 22;
    this.animationTimer = 0;
    this.animationInterval = 1000 / 25;
    this.sound =
      this.game.explosionSounds[
        Math.floor(Math.random() * this.game.explosionSounds.length)
      ];
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.free) {
      ctx.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - this.spriteWidth * 0.5,
        this.y - this.spriteHeight * 0.5,
        this.spriteWidth,
        this.spriteHeight
      );
    }
  }
  update(deltaTIme: number) {
    if (!this.free) {
      this.x += this.speed;
      if (this.animationTimer > this.animationInterval) {
        this.frameX++;
        this.animationTimer = 0;
        if (this.frameX > this.maxFrame) {
          this.reset();
        }
      } else {
        this.animationTimer += deltaTIme;
      }
    }
  }
  play() {
    this.sound.currentTime = 0;
    this.sound?.play();
  }

  reset() {
    this.free = true;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 3);
    this.sound =
      this.game.explosionSounds[
        Math.floor(Math.random() * this.game.explosionSounds.length)
      ];
  }
  start(x: number, y: number, speed: number) {
    this.free = false;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.play();
  }
}
