import { dfsRandom, pathGeneratorDfsRandom } from '../../algorithms/dfsRandom';
import { dfs, pathGeneratorDfs } from '../../algorithms/dfs';
import { bfs, pathGeneratorBfs } from '../../algorithms/bfs';
import { dijkstra, pathGeneratorDijkstra } from '../../algorithms/dijkstra';

export const visualize = (Grid, startRow, startColumn, endRow, endColumn, algorithm) => {
      const grid = Grid;
      let nodeVisitingOrder, nodesInPath;

      if (algorithm == "dfs") {
            nodeVisitingOrder = dfs(grid, startRow, startColumn, endRow, endColumn);
            nodesInPath = pathGeneratorDfs(grid, endRow, endColumn);
      }
      else if (algorithm == "bfs") {
            nodeVisitingOrder = bfs(grid, startRow, startColumn, endRow, endColumn);
            nodesInPath = pathGeneratorBfs(grid, endRow, endColumn);
      }
      else if (algorithm == "dijkstra") {
            nodeVisitingOrder = dijkstra(grid, startRow, startColumn, endRow, endColumn);
            nodesInPath = pathGeneratorDijkstra(grid, endRow, endColumn);
      }
      else if (algorithm == "dfsRandom") {
            nodeVisitingOrder = dfsRandom(grid, startRow, startColumn, endRow, endColumn);
            nodesInPath = pathGeneratorDfsRandom(grid, endRow, endColumn);
      }

      animate(nodeVisitingOrder, nodesInPath);
}

const animate = (nodeVisitingOrder, nodesInPath) => {
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