var found = false;
export function bfs(grid, si, sj, ei, ej) {
      var visitedArray = new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false));

      var listOfNodes = [];
      listOfNodes.push([si, sj]);

      visitedArray[si][sj] = true;
      var nodesInVisitedOrder = [];
      nodesInVisitedOrder.push([si, sj]);

      while (listOfNodes.length > 0) {
            let [ni, nj] = listOfNodes.shift();
            console.log(ni, nj);
            console.log(listOfNodes);

            if (ni > 0 && !visitedArray[ni - 1][nj] && !grid[ni - 1][nj].isWall) {
                  visitedArray[ni - 1][nj] = true;
                  nodesInVisitedOrder.push([ni - 1, nj]);
                  grid[ni - 1][nj].previous = [ni, nj];
                  listOfNodes.push([ni - 1, nj]);
                  console.log(`pushed down for ${ni},${nj}`)
            }
            if (nj > 0 && !visitedArray[ni][nj - 1] && !grid[ni][nj - 1].isWall) {
                  visitedArray[ni][nj - 1] = true;
                  nodesInVisitedOrder.push([ni, nj - 1]);
                  grid[ni][nj - 1].previous = [ni, nj];
                  listOfNodes.push([ni, nj - 1]);
                  console.log(`pushed left for ${ni},${nj}`)
            }
            if (ni < grid.length - 1 && !visitedArray[ni + 1][nj] && !grid[ni + 1][nj].isWall) {
                  visitedArray[ni + 1][nj] = true;
                  nodesInVisitedOrder.push([ni + 1, nj]);
                  grid[ni + 1][nj].previous = [ni, nj];
                  listOfNodes.push([ni + 1, nj]);
                  console.log(`pushed up for ${ni},${nj}`)
            }
            if (nj < grid[0].length - 1 && !visitedArray[ni][nj + 1] && !grid[ni][nj + 1].isWall) {
                  visitedArray[ni][nj + 1] = true;
                  nodesInVisitedOrder.push([ni, nj + 1]);
                  grid[ni][nj + 1].previous = [ni, nj];
                  listOfNodes.push([ni, nj + 1]);
                  console.log(`pushed right for ${ni},${nj}`)
            }
      }

      found = visitedArray[ei][ej];
      console.log('bfs finished');
      console.log(nodesInVisitedOrder);
      return nodesInVisitedOrder;
}

export function pathGeneratorBfs(grid, ei, ej) {
      if (!found) return [];
      var path = [];
      let ni = ei, nj = ej;
      while (ni !== -1 && nj !== -1) {
            path.push([ni, nj]);
            console.log([ni, nj]);
            console.log(grid[ni][nj].previous);
            [ni, nj] = grid[ni][nj].previous;
      }

      return path;
}