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
            style={{ position : "relative"}}
          >
            {
              this.renderCellContent(undefined)
            }
            {
              this.board[y][x].map((cellData, index) => {
                console.log(cellData+ ' ' + index);
                return this.renderCellContent(cellData);
              })
            }
            
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
    if (cellData === WUMPUS) {
      content.push(<img key="wumpus" src="/images/wumpus.png" alt="Wumpus" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    }  if (cellData === GOLD) {
      content.push(<img key="gold" src="/images/gold.png" alt="Gold" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    }  if (cellData === PIT) {
      content.push(<img key="pit" src="/images/pit.png" alt="Pit"   />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    }  if (cellData === STENCH) {
      content.push(<img key="stench" src="/images/stench.png" alt="Stench"  />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } if (cellData === BREEZE) {
      content.push(<img key="breeze" src="/images/breeze.png" alt="Breeze"   />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    }  if (cellData === AGENT) {
      content.push(<img key="agent" src="/images/agent.png" alt="Agent" />);
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    }  if (cellData=== OK) {
      // content.push(<img key="ok" src="/images/opened.png" alt="Ok" />);
    } 
    else if (cellData === undefined) {
      // Default case
      content.push(<img key="closed" src="/images/opened.png" alt="Closed" className="bg"/>);
    }

    return content;
  }
}

export default Board;
