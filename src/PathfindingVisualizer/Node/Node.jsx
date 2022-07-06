import React from 'react'
import './Node.css';

const Node = ({ isStart, isEnd, isWall, rowIdx, colIdx }) => {
      const classes = isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : '';
      return (
            <div className={`node-simple ${classes}`} id={`${rowIdx}-${colIdx}`}></div >
      );
}
export default Node;