import React from 'react';
import './Board.css'; 
import { initialize } from './wumpus_world/cave';
import { WUMPUS, PIT, GOLD, STENCH, BREEZE, AGENT, CAVE_LENGTH, CAVE_WIDTH, OK } from './wumpus_world/constants';

class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.board = initialize();
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
      content.push(<img key="agent" src="/images/agent.png" alt="Agent" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    }  else {
      // Default case
      content.push(<img key="closed" src="/images/closed.png" alt="Closed" />);
    }

    return <div className="cell-content">{content}</div>;
  }
}

export default MainBoard;
