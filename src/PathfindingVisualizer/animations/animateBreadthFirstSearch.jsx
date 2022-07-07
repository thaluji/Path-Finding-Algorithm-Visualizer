import { bfs, pathGeneratorBfs } from '../../algorithms/bfs';

export const visualizeBreadthFirstSearch = (Grid, startRow, startColumn, endRow, endColumn) => {
      const grid = Grid;
      const nodeVisitingOrder = bfs(grid, startRow, startColumn, endRow, endColumn);
      const nodesInPath = pathGeneratorBfs(grid, endRow, endColumn);
      animateBreadthFirstSearch(grid, nodeVisitingOrder, nodesInPath);
}

const animateBreadthFirstSearch = (grid, nodeVisitingOrder, nodesInPath) => {
      for (let i = 0; i < nodeVisitingOrder.length; i++) {
            setTimeout(() => {
                  const [x, y] = nodeVisitingOrder[i];
                  document.getElementById(`${x}-${y}`).className = 'node-simple node-visited';
            }, 5 * i);
      }

      setTimeout(() => {
            // var nodesInPath = pathGeneratorBfs(grid, endRow, endColumn);

            for (let i = 0; i < nodesInPath.length; i++) {
                  setTimeout(() => {
                        const [ni, nj] = nodesInPath[i];
                        document.getElementById(`${ni}-${nj}`).className = 'node-simple node-shortest-path';
                  }, 100 * i);
            }
      }, 5 * nodeVisitingOrder.length);
}