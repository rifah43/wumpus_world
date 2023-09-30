import React from 'react';
import "./Board.css";
import { AGENT, CAVE_LENGTH, CAVE_WIDTH, WUMPUS, GOLD, PIT, STENCH, BREEZE } from './wumpus_world/constants';
import { newCave } from './testFolder/wumpus_world/indexJS';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agentPositionY: props.agentPositionY,
      agentPositionX: props.agentPositionX,
      visitedCells: [`cell-0-0`],
      count:0
    };
  }

  componentDidMount() {
    console.log(newCave);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.nextPositionY !== this.props.nextPositionY || prevProps.nextPositionX !== this.props.nextPositionX) {
      const { nextPositionY, nextPositionX } = this.props;
      const visitedCells = this.state.visitedCells.slice(); // Copy the array
      const visitedCellId = `cell-${nextPositionY}-${nextPositionX}`;

      if (!visitedCells.includes(visitedCellId)) {
        visitedCells.push(visitedCellId);
      }

      this.setState({
        agentPositionY: nextPositionY,
        agentPositionX: nextPositionX,
        visitedCells: visitedCells,
      });
    }
  }

  render() {
    const { agentPositionY, agentPositionX, visitedCells } = this.state;
    const rows = CAVE_LENGTH;
    const cols = CAVE_WIDTH;
    const cells = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cellId = `cell-${y}-${x}`;
        const cellContent = newCave[y][x];

        const isVisitedCell = visitedCells.includes(cellId);

        cells.push(
          <div
            key={cellId}
            className={`cell ${y === agentPositionY && x === agentPositionX ? 'agent' : ''}`}
            id={cellId}
          >
            {this.renderCellContent(cellContent,this.state.count, isVisitedCell,y === agentPositionY && x === agentPositionX)}
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

  renderCellContent(cellData,count ,isVisitedCell, isAgentCell) {
    const content = [];

    if (isAgentCell) {
      content.push(<img key="agent" src="/images/agent.gif" alt="Agent" className="fg" />);
    } 

    if (cellData.includes(WUMPUS) && !isAgentCell && isVisitedCell) {
      content.push(<img key="wumpus" src="/images/wumpus.gif" alt="Wumpus" className="fg"/>);
    }
    if (cellData.includes(GOLD) && isVisitedCell && isAgentCell) {
      // content.push(<img key="gold" src="/images/gold.gif" alt="Gold" className="fg" />);
      count++;
      toast.success('Gold is grabbed!'+count, {
        position: 'top-center',
        autoClose: 2000,
      });
    }
    if (cellData.includes(PIT) && !isAgentCell && isVisitedCell) {
      content.push(<img key="pit" src="/images/pit.png" alt="Pit" className="fg" />);
    }
    if (cellData.includes(STENCH && isVisitedCell)) {
      content.push(<img key="stench" src="/images/stench.png" alt="Stench" className="fg" />);
    }
    if (cellData.includes(BREEZE) && !isAgentCell  && isVisitedCell) {
      content.push(<img key="breeze" src="/images/breeze.png" alt="Breeze" className="fg"/>);
    }
    if (!isVisitedCell ) {
      content.push(<img key="closed" src="/images/closed.png" alt="Breeze" className="fg"/>);
    }

    return content;
  }
}

export default MainBoard;
