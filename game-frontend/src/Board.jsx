import React from 'react';
import './Board.css'; 
import { WUMPUS, PIT, GOLD, STENCH, BREEZE, AGENT, CAVE_LENGTH, CAVE_WIDTH } from './wumpus_world/constants';
import {newCave } from './testFolder/wumpus_world/indexJS';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  swapPos(py,px,ny,nx){

  }

  componentDidMount() {
    console.log(newCave);
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
            {
              newCave[y][x].map((cellData) => {
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
      content.push(<img key="wumpus" src="/images/wumpus.gif" alt="Wumpus" className="fg"/>);
    }  if (cellData === GOLD) {
      content.push(<img key="gold" src="/images/gold.gif" alt="Gold" className="fg" />);
    }  if (cellData === PIT) {
      content.push(<img key="pit" src="/images/pit.png" alt="Pit"  className="fg" />);
    }  if (cellData === STENCH) {
      content.push(<img key="stench" src="/images/stench.png" alt="Stench" className="fg" />);
    } if (cellData === BREEZE) {
      content.push(<img key="breeze" src="/images/breeze.png" alt="Breeze" className="fg"/>);
    }  if (cellData === AGENT) {
      content.push(<img key="agent" src="/images/agent.gif" alt="Agent" className="fg"/>);
    }  

    return content;
  }
}

export default Board;
