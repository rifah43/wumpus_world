import React, { Component } from 'react';
import { AI_move_By_Propositional_logic } from './testFolder/wumpus_world/AI_moves';
import { getTotalNumberOfGold, getTotalNumberOfWumpus } from './testFolder/wumpus_world/cave';
import { initializeKnowledgeBase, update } from './testFolder/wumpus_world/knowledgeBase';
import { newCave } from './testFolder/wumpus_world/indexJS';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AgentMoves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      currentPositionY: 0,
      currentPositionX: 0,
      collectedGold: 0,
      numberOfArrows: 0,
      knowledgeBase: null,
      totalPoint: 0,
    };
    this.board = newCave;
    this.hasMounted = false;
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
        let continueUpdating = true;
        let knowledgeBase = initializeKnowledgeBase(this.board);
        let numberOfArrows = getTotalNumberOfWumpus(this.board);
        const maximumGold = getTotalNumberOfGold(this.board);
        let collectedGold = 0;
        let totalPoint = 100;

        knowledgeBase = update(this.board, knowledgeBase, 0, 0);
        let nextPositionY = 0;
        let nextPositionX = 0;

        while (continueUpdating) {
          const [
            updatedKnowledgeBase,
            updatedCave,
            allMoves,
            possibleActions,
            isWumpusKilled,
          ] = AI_move_By_Propositional_logic(
            knowledgeBase,
            this.board,
            numberOfArrows,
            nextPositionY,
            nextPositionX
          );

          knowledgeBase = updatedKnowledgeBase;
          this.board = updatedCave;
          const totalMoves = allMoves.length;

          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds

          for (let i = 0; i < totalMoves; i++) {
            const currentState = allMoves[i];
            
            if (currentState.action === 'SHOOT') {
              numberOfArrows--;
              totalPoint -= 10;
              if (isWumpusKilled) totalPoint += 1000;
            }

            if (currentState.move === 'RIGHT') {
              nextPositionX++;
              totalPoint--;
            } else if (currentState.move === 'LEFT') {
              nextPositionX--;
              totalPoint--;
            } else if (currentState.move === 'UP') {
              nextPositionY--;
              totalPoint--;
            } else if (currentState.move === 'DOWN') {
              nextPositionY++;
              totalPoint--;
            }

            if (currentState.grab) {
              collectedGold++;
              totalPoint += 1000;
            }

            this.setState({
              moves: allMoves,
              currentPositionY: nextPositionY,
              currentPositionX: nextPositionX,
              collectedGold: collectedGold,
              numberOfArrows: numberOfArrows,
              knowledgeBase: updatedKnowledgeBase,
              totalPoint: totalPoint,
            });
          }

          if (collectedGold === maximumGold) {
            continueUpdating = false;
            toast.success('You won!', {
              position: 'top-center',
              autoClose: 2000,
            });
          } else if (allMoves[totalMoves - 1].action === 'DIE') {
            continueUpdating = false;
            toast.error('Agent died with collected gold', {
              position: 'top-center',
              autoClose: 2000,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log(this.state);
    const { moves, currentPositionY, currentPositionX, collectedGold, totalPoint } = this.state;

    return (
      <div>
        <ToastContainer />
        <h2>Agent Moves</h2>
        <p>Current Position: ({currentPositionX}, {currentPositionY})</p>
        <p>Collected Gold: {collectedGold}</p>
        <p>Total Moves: {moves.length}</p>
        <p>Total Points: {totalPoint}</p>
      </div>
    );
  }
}

export default AgentMoves;
