import React from 'react';
import { AI_move_By_Propositional_logic } from './wumpus_world/AI_moves';
import { getBoard } from './wumpus_world/cave';

class AgentMoves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMove: null,
    };
    this.board = getBoard();
    // console.log(this.board);
  }

  componentDidMount() {
    // console.log(this.board);
    const { newBoard, moves } = AI_move_By_Propositional_logic(this.board);
    console.log(newBoard, moves);
    const firstMove = moves[0];
    this.board =  newBoard;

    this.setState({ currentMove: firstMove });
  }

  render() {
    // this.componentDidMount();
    const { currentMove } = this.state;

    return (
      <div>
        <h2>Agent Moves</h2>
        <p>Current Move: {currentMove}</p>
        {/* Logic likhbo */}
      </div>
    );
  }
}

export default AgentMoves ;
