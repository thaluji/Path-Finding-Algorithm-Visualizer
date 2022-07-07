var found = false;
export function dijkstra(grid, si, sj, ei, ej) {
      var distance = new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(1e9));
      var visitedArray = new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false));
      var nodesInVisitedOrder = [];

      var listOfNodes = [];
      distance[si][sj] = 0;
      listOfNodes.push([si, sj]);
      // nodesInVisitedOrder.push([si, sj]);

      while (listOfNodes.length > 0) {
            let [ni, nj] = [-1, -1], idx = -1, dis = 1e9 + 1;
            for (let i = 0; i < listOfNodes.length; i++) {
                  if (distance[listOfNodes[i][0]][listOfNodes[i][1]] < dis) {
                        [ni, nj] = [listOfNodes[i][0], listOfNodes[i][1]];
                        idx = i;
                        dis = distance[listOfNodes[i][0]][listOfNodes[i][1]];
                  }
            }

            if (idx !== -1) listOfNodes.splice(idx, 1);
            else continue;

            if (visitedArray[ni][nj]) continue;

            visitedArray[ni][nj] = true;
            nodesInVisitedOrder.push([ni, nj]);

            if (ni > 0 && !visitedArray[ni - 1][nj] && !grid[ni - 1][nj].isWall) {
                  if (distance[ni - 1][nj] > distance[ni][nj] + 1) {
                        distance[ni - 1][nj] = 1 + distance[ni][nj];
                        grid[ni - 1][nj].previous = [ni, nj];
                        listOfNodes.push([ni - 1, nj]);
                        // nodesInVisitedOrder.push([ni - 1, nj]);
                        console.log(`pushed up for ${ni},${nj}`)
                  }
            }
            if (ni < grid.length - 1 && !visitedArray[ni + 1][nj] && !grid[ni + 1][nj].isWall) {
                  if (distance[ni + 1][nj] > distance[ni][nj] + 1) {
                        distance[ni + 1][nj] = 1 + distance[ni][nj];
                        grid[ni + 1][nj].previous = [ni, nj];
                        listOfNodes.push([ni + 1, nj]);
                        // nodesInVisitedOrder.push([ni + 1, nj]);
                        console.log(`pushed down for ${ni},${nj}`)
                  }
            }
            if (nj > 0 && !visitedArray[ni][nj - 1] && !grid[ni][nj - 1].isWall) {
                  if (distance[ni][nj - 1] > distance[ni][nj] + 1) {
                        distance[ni][nj - 1] = 1 + distance[ni][nj];
                        grid[ni][nj - 1].previous = [ni, nj];
                        listOfNodes.push([ni, nj - 1]);
                        // nodesInVisitedOrder.push([ni, nj - 1]);
                        console.log(`pushed left for ${ni},${nj}`)
                  }
            }
            if (nj < grid[0].length - 1 && !visitedArray[ni][nj + 1] && !grid[ni][nj + 1].isWall) {
                  if (distance[ni][nj + 1] > distance[ni][nj] + 1) {
                        distance[ni][nj + 1] = 1 + distance[ni][nj];
                        grid[ni][nj + 1].previous = [ni, nj];
                        listOfNodes.push([ni, nj + 1]);
                        // nodesInVisitedOrder.push([ni, nj + 1]);
                        console.log(`pushed right for ${ni},${nj}`)
                  }
            }

      }
      console.log(distance);
      console.log(grid);

      if (distance[ei][ej] !== 1e9) found = true;

      return nodesInVisitedOrder;
}

export function pathGeneratorDijkstra(grid, ei, ej) {
      if (!found) return [];
      var path = [];
      let ni = ei, nj = ej;
      while (ni !== -1 && nj !== -1) {
            path.push([ni, nj]);
            [ni, nj] = grid[ni][nj].previous;
      }

      console.log(path);
      return path;
}