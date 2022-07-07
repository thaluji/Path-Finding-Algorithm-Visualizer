import { dijkstra, pathGeneratorDijkstra } from '../../algorithms/dijkstra';

export const visualizeDijkstra = (Grid, startRow, startColumn, endRow, endColumn) => {
      const grid = Grid;
      const nodeVisitingOrder = dijkstra(grid, startRow, startColumn, endRow, endColumn);
      const nodesInPath = pathGeneratorDijkstra(grid, endRow, endColumn);

      animateDijkstra(nodeVisitingOrder, nodesInPath);
}

const animateDijkstra = (nodeVisitingOrder, nodesInPath) => {
      for (let i = 0; i <= nodeVisitingOrder.length; i++) {
            setTimeout(() => {
                  const [ni, nj] = nodeVisitingOrder[i];
                  document.getElementById(`${ni}-${nj}`).className = 'node-simple node-visited';
            }, 5 * i);
      }


      setTimeout(() => {
            for (let i = 0; i < nodesInPath.length; i++) {
                  setTimeout(() => {
                        const [ni, nj] = nodesInPath[i];
                        document.getElementById(`${ni}-${nj}`).className = 'node-simple node-shortest-path';
                  }, 100 * i);
            }
      }, 50 * nodesInPath.length);
}