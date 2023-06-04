import "./style.css";
import { Game } from "./Game";

window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 600;
  canvas.height = 800;
  ctx.strokeStyle = "white";
  ctx.font = "20px Helvetica";
  ctx.fillStyle = "white";

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timeStamp: number = 0) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
