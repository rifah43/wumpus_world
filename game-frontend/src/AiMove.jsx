import React, { Component } from 'react';
import { AI_move_By_Propositional_logic } from './testFolder/wumpus_world/AI_moves';
import { getTotalNumberOfGold, getTotalNumberOfWumpus, setBoard } from './testFolder/wumpus_world/cave';
import { initializeKnowledgeBase, update } from './testFolder/wumpus_world/knowledgeBase';
import { newCave } from './testFolder/wumpus_world/indexJS';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Board from './Board';
import MainBoard from './MainBoard';
import './AiMove.css'; 

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
    };
    this.board = newCave;
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
        let knowledgeBase = initializeKnowledgeBase(this.board);
        let numberOfArrows = getTotalNumberOfWumpus(this.board);
        const maximumGold = getTotalNumberOfGold(this.board);
        let collectedGold = 0;
        let totalPoint = 100;

        knowledgeBase = update(this.board, knowledgeBase, 0, 0);
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
            knowledgeBase,
            this.board,
            numberOfArrows,
            nextPositionY,
            nextPositionX
          );

          knowledgeBase = updatedKnowledgeBase;
          this.board = updatedCave;
          const totalMoves = allMoves.length;

          for (let i = 0; i < totalMoves; i++) {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for .5 second

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
            // console.log(this.state.currentPositionY, this.state.currentPositionX, nextPositionY, nextPositionX);

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
            });

          }

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
          this.continueUpdating = false;
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


    return (
      <div>
        <ToastContainer />
        <h2>Agent Moves</h2>
        <p>Current Position: ({this.state.currentPositionY}, {this.state.currentPositionX})</p>
        <p>Collected Gold: {this.state.collectedGold}</p>
        <p>Possible Moves: {this.state.moves.length}</p>
        <p>Total Points: {this.state.totalPoint}</p>
        <div className='Board'><h3>Inspection Board</h3><Board 
              agentPositionY={this.state.prevPositionY} 
              agentPositionX={this.state.prevPositionX} 
              nextPositionY={this.state.currentPositionY}
              nextPositionX={this.state.currentPositionX}
              grab={this.state.moves.grab}
        /></div>
        <div className='MainBoard'><h3>Main Board</h3><MainBoard 
              agentPositionY={this.state.prevPositionY} 
              agentPositionX={this.state.prevPositionX} 
              nextPositionY={this.state.currentPositionY}
              nextPositionX={this.state.currentPositionX}
              grab={this.state.moves.grab}/></div>
      </div>
    );
  }
}

export default AgentMoves;
