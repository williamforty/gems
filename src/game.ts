import { drawBackground } from "./drawBackground";
import { drawBoard } from "./drawBoard";
import { drawStuff } from "./drawStuff";
import { drawTiles } from "./drawTiles";
import { generateBoard } from "./generateBoard";

export const gridSize = 9;
export const squareSize = 320 / (gridSize + 1);
let cursorX = 1;
let cursorY = 4;
const targetCursorX = 0;
const targetCursorY = 0;
let c = 0;

// Game number
const game = 510256994;

const z: number[] = [];

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

  const board = generateBoard(game, gridSize);
  board.forEach((b) => {
    z[b.n] = b.z;
  });

  function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game elements
    drawBackground(ctx);
    drawBoard(ctx);
    drawTiles(ctx);
    drawStuff(ctx, cursorX, cursorY, targetCursorX, targetCursorY, z);

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
}
