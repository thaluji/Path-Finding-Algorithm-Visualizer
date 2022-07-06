import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstra, pathGenerator } from '../algorithms/dijkstra';
import { dfs, pathGeneratorDfs } from '../algorithms/dfs';
import './PathfindingVisualizer.css';


const rowCount = 20, columnCount = 50;
const startRow = 0, startColumn = 0;
const endRow = rowCount - 1, endColumn = columnCount - 1;

const PathfindingVisualizer = () => {
      const [Grid, setGrid] = useState([]);

      useEffect(() => {
            initializeRandomGrid();
      }, []);

      const initializeRandomGrid = () => {
            const grid = new Array(rowCount);
            for (let i = 0; i < rowCount; i++) {
                  grid[i] = new Array(columnCount);
            }

            gridSetter(grid);
            setGrid(grid);
      };

      const gridSetter = (grid) => {
            for (let i = 0; i < rowCount; i++) {
                  for (let j = 0; j < columnCount; j++) {
                        grid[i][j] = new node_data(i, j);
                  }
            }
      };

      function node_data(i, j) {
            this.row = i;
            this.col = j;
            this.isVisited = false;
            this.isStart = (i === startRow && j === startColumn);
            this.isEnd = (i === endRow && j === endColumn);
            this.isWall = ((Math.floor(Math.random() * 4)) === 0 && !(this.isStart || this.isEnd));
            this.previous = [-1, -1];
      }

      console.log(Grid);

      const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
            for (let i = 0; i <= visitedNodesInOrder.length; i++) {
                  if (i === visitedNodesInOrder.length) {
                        setTimeout(() => {
                              animateShortestPath(nodesInShortestPathOrder);
                        }, 10 * i);
                        return;
                  }
                  setTimeout(() => {
                        const [ni, nj] = visitedNodesInOrder[i];
                        document.getElementById(`${ni}-${nj}`).className = 'node-simple node-visited';
                  }, 10 * i);
            }
      }

      const animateShortestPath = (nodesInShortestPathOrder) => {
            for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
                  setTimeout(() => {
                        const [ni, nj] = nodesInShortestPathOrder[i];
                        document.getElementById(`${ni}-${nj}`).className = 'node-simple node-shortest-path';
                  }, 50 * i);
            }
      }

      const visualizeDijkstra = () => {
            const grid = Grid;
            const visitedNodesInOrder = dijkstra(grid, startRow, startColumn, endRow, endColumn);
            const nodesInShortestPathOrder = pathGenerator(grid, endRow, endColumn);

            // console.log("dijkstra performed\n");
            // console.log(visitedNodesInOrder);
            // console.log(grid);
            // console.log(nodesInShortestPathOrder);

            animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }

      const visualizeDepthFirstSearch = () => {
            const grid = Grid;
            const nodeVisitingOrder = dfs(grid, startRow, startColumn, endRow, endColumn);
            animateDepthFirstSearch(grid, nodeVisitingOrder);
      }

      const animateDepthFirstSearch = (grid, nodeVisitingOrder) => {
            for (let i = 0; i < nodeVisitingOrder.length; i++) {
                  setTimeout(() => {
                        const [x, y] = nodeVisitingOrder[i];
                        document.getElementById(`${x}-${y}`).className = 'node-simple node-visited';
                  }, 10 * i);
            }

            setTimeout(() => {
                  var nodesInPath = pathGeneratorDfs(grid, endRow, endColumn);

                  for (let i = 0; i < nodesInPath.length; i++) {
                        setTimeout(() => {
                              const [ni, nj] = nodesInPath[i];
                              document.getElementById(`${ni}-${nj}`).className = 'node-simple node-shortest-path';
                        }, 50 * i);
                  }
            }, 10 * nodeVisitingOrder.length);
      }

      const gridWithNode = (
            <div>
                  {Grid.map((row, rowIndex) => {
                        return (
                              <div key={rowIndex} className='row'>
                                    {row.map((column, columnIndex) => {
                                          const { isStart, isEnd, isWall } = column;
                                          return (
                                                <Node key={columnIndex} isStart={isStart} isEnd={isEnd} isWall={isWall} rowIdx={rowIndex} colIdx={columnIndex} />
                                          );
                                    })}
                              </div>
                        );
                  })}
            </div>
      );

      return (
            <>
                  <header>
                        <h1>PathFinder Visualization</h1>
                        <button style={{ right: '50px' }} onClick={() => visualizeDijkstra()}>Dijkstra's Algorithm</button>
                        <button style={{ right: '250px' }} onClick={() => visualizeDepthFirstSearch()}>Depth First Search</button>
                  </header>
                  <body>
                        <div className='matrix'>
                              {gridWithNode}
                        </div>
                  </body>
            </>
      );
};

export default PathfindingVisualizer;