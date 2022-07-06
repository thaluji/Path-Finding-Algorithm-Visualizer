import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
      constructor() {
            super();
            this.state = {
                  grid: [],
            };
      }

      componentDidMount() {
            this.getRandomGrid();
      }

      getRandomGrid() {
            let grid = [];
            for (let row = 0; row < 20; row++) {
                  const currentRow = [];
                  for (let col = 0; col < 50; col++) {
                        currentRow.push(createNode(col, row));
                  }
                  grid.push(currentRow);
            }

            this.setState({ grid });
      }

      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
            for (let i = 0; i <= visitedNodesInOrder.length; i++) {
                  if (i === visitedNodesInOrder.length) {
                        setTimeout(() => {
                              this.animateShortestPath(nodesInShortestPathOrder);
                        }, 10 * i);
                        return;
                  }
                  setTimeout(() => {
                        const node = visitedNodesInOrder[i];
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node-visited';
                  }, 10 * i);
            }
      }

      animateShortestPath(nodesInShortestPathOrder) {
            for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
                  setTimeout(() => {
                        const node = nodesInShortestPathOrder[i];
                        document.getElementById(`node-${node.row}-${node.col}`).className =
                              'node-shortest-path';
                  }, 50 * i);
            }
      }

      visualizeDijkstra() {
            const { grid } = this.state;
            const startNode = grid[START_NODE_ROW][START_NODE_COL];
            const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
            const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }



      render() {
            const { grid } = this.state;
            console.log(grid);

            return (
                  <>
                        <header>
                              <button onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
                              <button onClick={() => this.getRandomGrid()}>Generate New Grid</button>
                        </header>
                        <div className="grid">
                              {grid.map((row, rowIdx) => {
                                    return <div key={rowIdx}>
                                          {row.map((column, colIdx) => {
                                                const { row, col, isFinish, isStart, isWall, isVisited } = column;
                                                return <Node key={colIdx} col={col} isFinish={isFinish} isStart={isStart} isWall={isWall} row={row} isVisited={isVisited}></Node>
                                          })}
                                    </div>
                              })}
                        </div>
                  </>
            );
      }
}



function createNode(col, row) {
      return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: (Math.floor(Math.random() * 3) === 0) ? true : false,
            previousNode: null,
      };
};