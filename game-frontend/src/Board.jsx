import React from 'react';
import './Board.css'; 
import { initialize } from './wumpus_world/cave';
import { WUMPUS, PIT, GOLD, STENCH, BREEZE, AGENT, CAVE_LENGTH, CAVE_WIDTH, OK } from './wumpus_world/constants';

class Board extends React.Component {
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

    if (cellData[0] === WUMPUS) {
      content.push(<img key="wumpus" src="/images/wumpus.png" alt="Wumpus" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } else if (cellData[0] === GOLD) {
      content.push(<img key="gold" src="/images/gold.png" alt="Gold" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } else if (cellData[0] === PIT) {
      content.push(<img key="pit" src="/images/pit.png" alt="Pit" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } else if (cellData[0] === STENCH) {
      content.push(<img key="stench" src="/images/stench.png" alt="Stench" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } else if (cellData[0] === BREEZE) {
      content.push(<img key="breeze" src="/images/breeze.png" alt="Breeze" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } else if (cellData[0] === AGENT) {
      content.push(<img key="agent" src="/images/agent.png" alt="Agent" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } else if (cellData[0] === OK) {
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } else {
      // Default case
      content.push(<img key="closed" src="/images/opened.png" alt="Closed" />);
    }

    return <div className="cell-content">{content}</div>;
  }
}

export default Board;
