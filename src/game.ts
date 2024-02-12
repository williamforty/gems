import { drawBackground } from "./drawBackground";
import { drawBoard } from "./drawBoard";
import { drawStuff } from "./drawStuff";
import { drawTiles } from "./drawTiles";

export const gridSize = 9;
export const squareSize = 320 / (gridSize + 1);
let cursorX = 1;
let cursorY = 4;
const targetCursorX = 0;
const targetCursorY = 0;
let c = 0;

// Game number
const game = 510256994;

const x: number[] = [];
const y: number[] = [];
const z: number[] = [];

const generateBoard = () => {
  for (let n = 1; n <= gridSize ** 2; n++) {
    x[n] = -(((n - 1) % gridSize) + 1) + gridSize + 1;
    y[n] = Math.floor((gridSize - 1 + n) / gridSize);
    z[n] = Math.floor((game / n) % 15);
    if (z[n] >= 12) {
      z[n] = 1;
    } else if (z[n] > 5 || z[n] === 0) {
      z[n] = 10;
    }
  }
};

export function gemsGame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  canvas.addEventListener("mousemove", handleMouseMove);

  function handleMouseMove(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top - 256 + 10;

    cursorX = -Math.floor((2 * mouseY - mouseX) / (2 * squareSize));
    cursorY = Math.floor((2 * mouseY + mouseX) / (2 * squareSize));
  }

  canvas.addEventListener("mouseleave", handleMouseLeave);

  function handleMouseLeave() {
    mouseX = 0;
    mouseY = 0;
  }

  let mouseX = 1;
  let mouseY = 1;

  generateBoard();

  function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game elements
    drawBackground(ctx);
    drawBoard(ctx);
    drawTiles(ctx, x, y);
    drawStuff(ctx, cursorX, cursorY, targetCursorX, targetCursorY, x, y, z);

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
}
