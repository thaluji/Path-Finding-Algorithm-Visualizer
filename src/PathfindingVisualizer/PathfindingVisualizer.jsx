import React, { useState, useEffect } from 'react';

import Node from './Node/Node';

// import { visualizeDijkstra } from './animations/animateDijkstra'
// import { visualizeDepthFirstSearch } from './animations/animateDepthFirstSearch'
import { visualize } from './animations/animateDepthFirstSearchRandom'
// import { visualizeBreadthFirstSearch } from './animations/animateBreadthFirstSearch'

import './PathfindingVisualizer.css';


const rowCount = 20, columnCount = 50;
// const rowCount = 40, columnCount = 100;
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

      const gridReset = (random) => {
            for (let i = 0; i < rowCount; i++) {
                  for (let j = 0; j < columnCount; j++) {
                        Grid[i][j].isVisited = false;
                        Grid[i][j].previous = [-1, -1];

                        if (Grid[i][j].isStart) {
                              document.getElementById(`${i}-${j}`).className = 'node-simple node-start';
                        }
                        else if (Grid[i][j].isEnd) {
                              document.getElementById(`${i}-${j}`).className = 'node-simple node-end';
                        }
                        else if (Grid[i][j].isWall) {
                              if (random) {
                                    let isStart = (i == startRow) && (j == startColumn);
                                    let isEnd = (i == endRow) && (j == endColumn);

                                    let isWall = ((Math.floor(Math.random() * 4)) === 0 && !(isStart || isEnd));

                                    Grid[i][j].isWall = isWall;
                                    if (isWall) document.getElementById(`${i}-${j}`).className = 'node-simple node-wall';
                                    else document.getElementById(`${i}-${j}`).className = 'node-simple';
                              }
                              else {
                                    document.getElementById(`${i}-${j}`).className = 'node-simple node-wall';
                              }
                        }
                        else {
                              if (random) {
                                    let isStart = (i == startRow) && (j == startColumn);
                                    let isEnd = (i == endRow) && (j == endColumn);
                                          
                                    let isWall = ((Math.floor(Math.random() * 4)) === 0 && !(isStart || isEnd));

                                    Grid[i][j].isWall = isWall;
                                    if (isWall) document.getElementById(`${i}-${j}`).className = 'node-simple node-wall';
                                    else document.getElementById(`${i}-${j}`).className = 'node-simple';
                              }
                              else {
                                    document.getElementById(`${i}-${j}`).className = 'node-simple';
                              }
                        }
                  }
            }
      }

      return (
            <>
                  <header>
                        <h1>PathFinder Visualization</h1>
                        <div className='resetButtons'>
                              <button className="resetbutton" id='rst' style={{ left: '725px' }}
                                    onClick={() => gridReset(false)}>
                                    Reset Grid
                              </button>
                              <button className="resetbutton" id='rst' style={{ left: '705px', top: '30px' }}
                                    onClick={() => gridReset(true)}>
                                    Randomize Grid
                              </button>
                        </div>

                        <button className="button" id='dij' style={{ right: '30px' }}
                              onClick={() => visualize(Grid, startRow, startColumn, endRow, endColumn, "dijkstra")}>
                              Dijkstra's Algorithm
                        </button>
                        <button className="button" id='dfs' style={{ right: '190px' }}
                              onClick={() => visualize(Grid, startRow, startColumn, endRow, endColumn, "dfs")}>
                              Depth First Search
                        </button>
                        <button className="button" id='dfs' style={{ right: '350px' }}
                              onClick={() => visualize(Grid, startRow, startColumn, endRow, endColumn, "dfsRandom")}>
                              Depth First Search Random
                        </button>
                        <button className="button" id='bfs' style={{ right: '500px' }}
                              onClick={() => visualize(Grid, startRow, startColumn, endRow, endColumn, "bfs")}>
                              Breadth First Search
                        </button>
                  </header>
                  <hr style={{ color: "yellow" }}></hr>
                  <body>
                        <div className='matrix'>
                              {gridWithNode}
                        </div>
                  </body>
            </>
      );
};

export default PathfindingVisualizer;