let rowCount = null, colCount = null, found = false;

export function dfsRandom(grid, si, sj, ei, ej) {
      rowCount = grid.length;
      colCount = grid[0].length;
      let visitedArray = new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false));
      var nodeVisitingOrder = [];
      dfs_helper(grid, si, sj, ei, ej, -1, -1, nodeVisitingOrder, visitedArray);

      return nodeVisitingOrder;
}

function dfs_helper(grid, si, sj, ei, ej, pi, pj, nodeVisitingOrder, visitedArray) {
      if (si < 0 || si >= rowCount || sj < 0 || sj >= colCount) return;
      if (grid[si][sj].isWall) return;
      if (visitedArray[si][sj] === true) return;
      if (found) return;

      const [xi, xj] = grid[si][sj].previous
      if (xi === -1 && xj === -1) {
            grid[si][sj].previous = [pi, pj];
      }
      visitedArray[si][sj] = true;
      nodeVisitingOrder.push([si, sj]);

      if (si === ei && sj === ej) found = true;

      let arr = [0, 1, 2, 3];
      arr.sort(() => Math.random() - 0.5);

      for (let i = 0; i < 4; i++) {
            if (arr[i] == 0) {
                  dfs_helper(grid, si + 1, sj, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
            }
            else if (arr[i] == 1) {
                  dfs_helper(grid, si, sj + 1, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
            }
            else if (arr[i] == 2) {
                  dfs_helper(grid, si - 1, sj, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
            }
            else if (arr[i] == 3) {
                  dfs_helper(grid, si, sj - 1, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
            }
      }
}

export function pathGeneratorDfsRandom(grid, ei, ej) {
      if (!found) return [];
      var path = [];
      let ni = ei, nj = ej;
      while (ni !== -1 && nj !== -1) {
            path.push([ni, nj]);
            console.log([ni, nj]);
            console.log(grid[ni][nj].previous);
            [ni, nj] = grid[ni][nj].previous;
      }

      found = false;
      return path;
}