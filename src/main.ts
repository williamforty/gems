import { gemsGame } from "./game";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <canvas id="gameCanvas" width="640" height="512" style="border: solid 5px #000"></canvas>
  </div>
`;

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

gemsGame(canvas, ctx);
