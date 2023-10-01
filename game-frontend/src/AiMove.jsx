import React, { Component } from 'react';
import { AI_move_By_Propositional_logic } from './testFolder/wumpus_world/AI_moves';
import { getTotalNumberOfGold, getTotalNumberOfWumpus, setBoard, storeBoard } from './testFolder/wumpus_world/cave';
import { initializeKnowledgeBase, update } from './testFolder/wumpus_world/knowledgeBase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Board from './Board';
import MainBoard from './MainBoard';
import './AiMove.css'; 
import ProbabilityBoard from './ProbabilityBoard';

class AgentMoves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      prevPositionY: 0,
      prevPositionX: 0,
      currentPositionY: 0,
      currentPositionX: 0,
      collectedGold: 0,
      numberOfArrows: 0,
      knowledgeBase: null,
      totalPoint: 100,
      possibleActions: [],
    };
    this.board = storeBoard();
    // console.log(this.board);
    this.knowledgeBase = null;
    this.hasMounted = false;
    this.continueUpdating = true; 
  }

	calculatePoint(action, grab) {
		let points = 0;
		if (grab) {
			points += 1000;
		}
		if (action === 'SHOOT') {
			points -= 10;
		} else if (action !== 'SHOOT') {
			points -= 1;
		}

		return points;
	}

  async componentDidMount() {
    try {
      if (!this.hasMounted) {
        this.hasMounted = true;
        this.knowledgeBase = initializeKnowledgeBase(this.board);
        let numberOfArrows = getTotalNumberOfWumpus(this.board, this.board.length, this.board[0].length);
        const maximumGold = getTotalNumberOfGold(this.board,this.board.length, this.board[0].length);
        let collectedGold = 0;
        let totalPoint = 100;

        this.knowledgeBase = update(this.board, this.knowledgeBase, 0, 0);
        let nextPositionY = 0;
        let nextPositionX = 0;

        while (this.continueUpdating) {
          const [
            updatedKnowledgeBase,
            updatedCave,
            allMoves,
            possibleActions,
            isWumpusKilled,
          ] = AI_move_By_Propositional_logic(
            this.knowledgeBase, 
            this.board,
            numberOfArrows,
            nextPositionY,
            nextPositionX
          );

          this.knowledgeBase = updatedKnowledgeBase;
          console.log(this.knowledgeBase);
          this.board = updatedCave;
          const totalMoves = allMoves.length;
          this.knowledgeBase = updatedKnowledgeBase;
          for (let i = 0; i < totalMoves; i++) {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for .5 second

						const currentState = allMoves[i];

						if (currentState.action === 'SHOOT') {
							numberOfArrows--;
							totalPoint -= 10;
							if (isWumpusKilled) totalPoint += 1000;
						}

						if (currentState.move === 'RIGHT' && (i+1) != allMoves) {
							nextPositionX++;
							totalPoint--;
						} else if (currentState.move === 'LEFT' && (i+1) != allMoves) {
							nextPositionX--;
							totalPoint--;
						} else if (currentState.move === 'UP' && (i+1) != allMoves) {
							nextPositionY--;
							totalPoint--;
						} else if (currentState.move === 'DOWN' && (i+1) != allMoves) {
							nextPositionY++;
							totalPoint--;
						}

						if (currentState.grab) {
							toast.success('Gold is grabbed!', {
								position: 'top-center',
								autoClose: 2000,
							});
							collectedGold++;
							totalPoint += 1000;

            }
            this.setState({
              moves: allMoves,
              prevPositionY: this.state.currentPositionY,
              prevPositionX: this.state.currentPositionX,
              currentPositionY: nextPositionY,
              currentPositionX: nextPositionX,
              collectedGold: collectedGold,
              numberOfArrows: numberOfArrows,
              knowledgeBase: updatedKnowledgeBase,
              totalPoint: totalPoint,
              possibleActions: allMoves,
            });
          }
          console.log(allMoves[totalMoves - 1].action);
          if (collectedGold === maximumGold) {
            this.continueUpdating = false;
            toast.success('You won!', {
              position: 'top-center',
              autoClose: 2000,
            });
          } else if (allMoves[totalMoves - 1].action === 'DIE') {
            this.continueUpdating = false;
            toast.error('Agent died with collected gold', {
              position: 'top-center',
              autoClose: 2000,
            });
          } else if (allMoves[totalMoves - 1].action === 'SHOOT') {
            // this.board[nextPositionY][nextPositionX] = null;
            // setBoard(this.board,this.board.length, this.board[0].length);
            toast.success('Wumpus is killed', {
            position: 'top-center',
            autoClose: 2000,
          });
          }
        }
    } }catch (err) {
      console.log(err);
    }
  }

	render() {
		const possibleActionsText = this.state.possibleActions.map(action => `${action.action} - ${action.move}`).join(', ');

    return (
      <>
        <ToastContainer />
        <div>
        <div>
        <div className='Board'><h3>Inspection Board</h3><Board 
              agentPositionY={this.state.prevPositionY} 
              agentPositionX={this.state.prevPositionX} 
              nextPositionY={this.state.currentPositionY}
              nextPositionX={this.state.currentPositionX}
              grab={this.state.moves.grab}
              board={this.board}
        /></div>
          {this.state.knowledgeBase !== null && (
            <div className='PBoard'>
              <h3>Probability Board</h3>
              <ProbabilityBoard knowledgeBase={this.state.knowledgeBase} board={this.board} />
            </div>
          )}
        </div>

          <div className='MainBoard'><h3>Main Board</h3><MainBoard 
              agentPositionY={this.state.prevPositionY} 
              agentPositionX={this.state.prevPositionX} 
              nextPositionY={this.state.currentPositionY}
              nextPositionX={this.state.currentPositionX}
              grab={this.state.moves.grab}
              board={this.board}
              />
        </div>
          <div className='mr-10'>
            <h2>Agent Moves</h2>
            <p>Current Position: ({this.state.currentPositionY}, {this.state.currentPositionX})</p>
            <p>Collected Gold: {this.state.collectedGold}</p>
            <p>Number of possible Moves: {this.state.moves.length}</p>
            <p>All Moves: {possibleActionsText}</p>
            <p>Total Points: {this.state.totalPoint}</p>
          </div>
        </div>
      </>
    );
  }
}

export default AgentMoves;
