export const generateBoard = (game: number, gridSize: number) =>
  Array.from({ length: gridSize ** 2 }).map((_, nz) => {
    const n = nz + 1;
    const z = Math.floor((game / n) % 15);
    return {
      n,
      z: z >= 12 ? 1 : z > 5 || z === 0 ? 10 : z,
    };
  });
