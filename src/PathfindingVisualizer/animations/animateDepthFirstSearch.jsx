import { dfs, pathGeneratorDfs } from '../../algorithms/dfs';

export const visualizeDepthFirstSearch = (Grid, startRow, startColumn, endRow, endColumn) => {
      const grid = Grid;
      const nodeVisitingOrder = dfs(grid, startRow, startColumn, endRow, endColumn);
      const nodesInPath = pathGeneratorDfs(grid, endRow, endColumn);
      animateDepthFirstSearch(grid, nodeVisitingOrder, nodesInPath);
}

const animateDepthFirstSearch = (grid, nodeVisitingOrder, nodesInPath) => {
      for (let i = 0; i < nodeVisitingOrder.length; i++) {
            setTimeout(() => {
                  const [x, y] = nodeVisitingOrder[i];
                  document.getElementById(`${x}-${y}`).className = 'node-simple node-visited';
            }, 5 * i);
      }

      setTimeout(() => {

            for (let i = 0; i < nodesInPath.length; i++) {
                  setTimeout(() => {
                        const [ni, nj] = nodesInPath[i];
                        document.getElementById(`${ni}-${nj}`).className = 'node-simple node-shortest-path';
                  }, 100 * i);
            }
      }, 10 * nodeVisitingOrder.length);
}