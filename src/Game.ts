import { Astroid } from "./Astroid";
import { Explosion } from "./Explosion";

interface Circle {
  x: number;
  y: number;
  radius: number;
}

export class Game {
  width: number;
  height: number;
  asteroidPool: Astroid[];
  maxAstroids: number;
  asteroidTimer: number;
  asteroidInterval: number;
  explosionPool: Explosion[];
  maxExplosions: number;
  mouse: Circle;
  score: number;
  maxScore: number;
  gameOver: boolean;
  explosionSounds: NodeListOf<HTMLAudioElement>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.asteroidPool = [];
    this.maxAstroids = 30;
    this.asteroidTimer = 0;
    this.asteroidInterval = 1000;
    this.explosionPool = [];
    this.maxExplosions = 20;
    this.score = 0;
    this.maxScore = 30;
    this.gameOver = false;

    this.explosionSounds = document.querySelectorAll(
      ".explosionSound"
    ) as NodeListOf<HTMLAudioElement>;

    this.createAstroidPool();
    this.createExplosiontPool();

    this.mouse = {
      x: 0,
      y: 0,
      radius: 2,
    };

    window.addEventListener("click", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      for (let index = 0; index < this.asteroidPool.length; index++) {
        const astroid = this.asteroidPool[index];
        if (
          this.checkCollision(astroid, this.mouse) &&
          !astroid.free &&
          !this.gameOver
        ) {
          const explosion = this.getFreeExplosion();
          explosion?.start(this.mouse.x, this.mouse.y, astroid.speed);
          astroid.reset();
          this.score++;
        }
      }
    });
  }
  createAstroidPool() {
    for (let i = 0; i < this.maxAstroids; i++) {
      this.asteroidPool.push(new Astroid(this));
    }
  }
  createExplosiontPool() {
    for (let i = 0; i < this.maxExplosions; i++) {
      this.explosionPool.push(new Explosion(this));
    }
  }

  getFreeAstroid() {
    for (let i = 0; i < this.asteroidPool.length; i++) {
      if (this.asteroidPool[i].free) {
        return this.asteroidPool[i];
      }
    }
  }

  getFreeExplosion() {
    for (let i = 0; i < this.explosionPool.length; i++) {
      if (this.explosionPool[i].free) {
        return this.explosionPool[i];
      }
    }
  }
  checkCollision(a: Circle, b: Circle) {
    const sumOfRaii = a.radius + b.radius;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.hypot(dx, dy);
    return distance < sumOfRaii;
  }

  render(ctx: CanvasRenderingContext2D, deltaTime: number) {
    // Create asteroids periodicaly
    if (this.asteroidTimer > this.asteroidInterval) {
      const asteroid = this.getFreeAstroid();
      asteroid?.start();
      this.asteroidTimer = 0;
    } else {
      this.asteroidTimer += deltaTime;
    }
    for (let a = 0; a < this.asteroidPool.length; a++) {
      const asteroid = this.asteroidPool[a];
      asteroid.draw(ctx);
      asteroid.update();
    }
    for (let a = 0; a < this.explosionPool.length; a++) {
      const explosion = this.explosionPool[a];
      explosion.draw(ctx);
      explosion.update(deltaTime);
    }
    ctx.fillText(`Score: ${this.score} / ${this.maxScore}`, 20, 35);
    if (this.score >= this.maxScore) {
      this.gameOver = true;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `You win, final score: ${this.score}`,
        this.width * 0.5,
        this.height * 0.5
      );
      ctx.restore();
    }
  }
}
