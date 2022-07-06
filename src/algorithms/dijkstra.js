var found = false;
export function dijkstra(grid, si, sj, ei, ej) {
      var distance = new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(1e9));
      var visitedArray = new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false));
      var nodesInVisitedOrder = [];

      var listOfNodes = [];
      distance[si][sj] = 0;
      visitedArray[si][sj] = true;
      listOfNodes.push([si, sj]);
      nodesInVisitedOrder.push([si, sj]);

      while (listOfNodes.length > 0) {
            var [ni, nj] = [-1, -1], idx = -1, dis = 1e9;
            for (let i = 0; i < listOfNodes.length; i++) {
                  if (distance[listOfNodes[i][0]][listOfNodes[i][1]] < dis) {
                        [ni, nj] = [listOfNodes[i][0], listOfNodes[i][1]];
                        idx = i;
                  }
            }

            if (idx !== -1) listOfNodes.splice(idx);
            else return nodesInVisitedOrder;

            // if (grid[ni][nj].isWall) continue;

            visitedArray[ni][nj] = true;
            // nodesInVisitedOrder.push([ni, nj]);

            if (ni === ei && nj === ej) {
                  found = true;
                  return nodesInVisitedOrder;
            }

            if (ni > 0 && !visitedArray[ni - 1][nj] && !grid[ni - 1][nj].isWall) {
                  if (distance[ni - 1][nj] > distance[ni][nj] + 1) {
                        distance[ni - 1][nj] = 1 + distance[ni][nj];
                        grid[ni - 1][nj].previous = [ni, nj];
                        listOfNodes.push([ni - 1, nj]);
                        nodesInVisitedOrder.push([ni - 1, nj]);
                  }
            }
            if (ni < grid.length - 1 && !visitedArray[ni + 1][nj] && !grid[ni + 1][nj].isWall) {
                  if (distance[ni + 1][nj] > distance[ni][nj] + 1) {
                        distance[ni + 1][nj] = 1 + distance[ni][nj];
                        grid[ni + 1][nj].previous = [ni, nj];
                        listOfNodes.push([ni + 1, nj]);
                        nodesInVisitedOrder.push([ni + 1, nj]);
                  }
            }
            if (nj > 0 && !visitedArray[ni][nj - 1] && !grid[ni][nj - 1].isWall) {
                  if (distance[ni][nj - 1] > distance[ni][nj] + 1) {
                        distance[ni][nj - 1] = 1 + distance[ni][nj];
                        grid[ni][nj - 1].previous = [ni, nj];
                        listOfNodes.push([ni, nj - 1]);
                        nodesInVisitedOrder.push([ni, nj - 1]);
                  }
            }
            if (nj < grid[0].length - 1 && !visitedArray[ni][nj + 1] && !grid[ni][nj + 1].isWall) {
                  if (distance[ni][nj + 1] > distance[ni][nj] + 1) {
                        distance[ni][nj + 1] = 1 + distance[ni][nj];
                        grid[ni][nj + 1].previous = [ni, nj];
                        listOfNodes.push([ni, nj + 1]);
                        nodesInVisitedOrder.push([ni, nj + 1]);
                  }
            }

      }
      console.log(distance);
      return nodesInVisitedOrder;
}

export function pathGenerator(grid, ei, ej) {
      if (!found) return [];
      var path = [];
      let ni = ei, nj = ej;
      while (ni !== -1 && nj !== -1) {
            path.push([ni, nj]);
            console.log([ni, nj]);
            console.log(grid[ni][nj].previous);
            [ni, nj] = grid[ni][nj].previous;
      }

      console.log(path);
      return path;
}