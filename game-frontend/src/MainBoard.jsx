import React from 'react';
import "./Board.css";
import {  mainboard_initialize } from './wumpus_world/cave';
import { AGENT, CAVE_LENGTH, CAVE_WIDTH, WUMPUS, GOLD, PIT, STENCH, BREEZE } from './wumpus_world/constants';

class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.board = mainboard_initialize();
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
      // content.push(<img key="ok" src="/images/opened.gif" alt="Ok" />);
    }  if (cellData === WUMPUS) {
      content.push(<img key="wumpus" src="/images/wumpus.gif" alt="Wumpus" className="fg"/>);
    }  if (cellData === GOLD) {
      content.push(<img key="gold" src="/images/gold.gif" alt="Gold" className="fg" />);
    }  if (cellData === PIT) {
      content.push(<img key="pit" src="/images/pit.png" alt="Pit"  className="fg" />);
    }  if (cellData === STENCH) {
      content.push(<img key="stench" src="/images/stench.png" alt="Stench" className="fg" />);
    } if (cellData === BREEZE) {
      content.push(<img key="breeze" src="/images/breeze.png" alt="Breeze" className="fg"/>);
    } 

    return <div className="cell-content">{content}</div>;
  }
}

export default MainBoard;
