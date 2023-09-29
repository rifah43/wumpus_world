import React from 'react';
import "./Board.css";
import { AGENT, CAVE_LENGTH, CAVE_WIDTH, WUMPUS, GOLD, PIT, STENCH, BREEZE } from './wumpus_world/constants';
import {newCave } from './testFolder/wumpus_world/indexJS';

class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.board = newCave;
    console.log(this.board);
  }

  sendBoard(){
    return this.board;
  }

  render() {  
    const rows = CAVE_LENGTH;
    const cols = CAVE_WIDTH;
    const cells = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cellId = `cell-${y}-${x}`;
        cells.push(
          <div
            key={cellId}
            className="cell"
            id={cellId}
          >
            {this.renderCellContent(this.board[y][x])}
          </div>
        );
      }
    }

    return (
      <div className="board">
        {cells}
      </div>
    );
  } 

  renderCellContent(cellData) {
    const content = [];
   
    if (cellData[0] === AGENT) {
      content.push(<img key="agent" src="/images/agent.gif" alt="Agent" />);
    } else{
      content.push(<img key="agent" src="/images/closed.png" alt="Agent" />);
    }

    return <div className="cell-content">{content}</div>;
  }
}

export default MainBoard;
