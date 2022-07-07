let rowCount = null, colCount = null, found = false;

export function dfs(grid, si, sj, ei, ej) {
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

      dfs_helper(grid, si + 1, sj, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
      dfs_helper(grid, si, sj + 1, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
      dfs_helper(grid, si - 1, sj, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
      dfs_helper(grid, si, sj - 1, ei, ej, si, sj, nodeVisitingOrder, visitedArray);
}

export function pathGeneratorDfs(grid, ei, ej) {
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