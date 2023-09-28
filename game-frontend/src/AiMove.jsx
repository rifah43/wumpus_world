import React from 'react';
import { AI_move_By_Propositional_logic } from './wumpus_world/AI_moves';
import { getBoard } from './wumpus_world/cave';

class AgentMoves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMove: null,
      currentAction: null,
      currentGrab: false,
    };
    this.board = getBoard();
    console.log(this.board);
  }

  async componentDidMount() {
    try {
      const moves = await AI_move_By_Propositional_logic(this.board);
      let {move, action, grab} = moves[0];
      console.log(moves, move, action, grab);
      this.setState({
        currentMove: move.toString(),
        currentAction: action.toString(),
        currentGrab: grab,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    // this.componentDidMount();
    const { currentMove, currentAction, currentGrab } = this.state;

    return (
      <div>
        <h2>Agent Moves</h2>
        <p>Current Move: {currentMove}</p>
        <p>Current Action: {currentAction}</p>
        <p>Current Grab: {currentGrab ? 'Yes' : 'No'}</p>
        {/* Logic likhbo */}
      </div>
    );
  }
}

export default AgentMoves ;
