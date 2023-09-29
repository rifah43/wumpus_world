import React, { Component } from 'react';
import { AI_move_By_Propositional_logic } from './testFolder/wumpus_world/AI_moves';
import { getTotalNumberOfGold, getTotalNumberOfWumpus } from './testFolder/wumpus_world/cave';
import { initializeKnowledgeBase, update } from './testFolder/wumpus_world/knowledgeBase';
import { newCave } from './testFolder/wumpus_world/indexJS';

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

  calculatePoint(action, grab){
    let points=0;
    if(grab){
      points+=1000;
    }
    if(action === 'SHOOT'){
      points-=10;
    }else if(action !== 'SHOOT'){
      points-=1;
    }

    return points
  }

  async componentDidMount() {
    try {
      if (!this.hasMounted) {
        this.hasMounted = true;
        let continueUpdating = true;
        console.log(newCave);
        let knowledgeBase = initializeKnowledgeBase(this.board);
        let numberOfArrows = getTotalNumberOfWumpus(this.board);
        const maximumGold = getTotalNumberOfGold(this.board);
        let collectedGold = 0;
        let totalPoint = 0;

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
          console.log(totalMoves);
          this.setState((prevState) => ({
            moves: allMoves,
            currentPositionY: nextPositionY,
            currentPositionX: nextPositionX,
            collectedGold: prevState.collectedGold + (allMoves[totalMoves - 1].grab ? 1 : 0),
            numberOfArrows: prevState.numberOfArrows - (allMoves[totalMoves - 1].action === 'SHOOT' ? 1 : 0),
            knowledgeBase: updatedKnowledgeBase,
            totalPoint: prevState.totalPoint + this.calculatePoint(allMoves[totalMoves - 1].action , allMoves[totalMoves - 1].grab),
          }));

          if (collectedGold === maximumGold) {
            continueUpdating = false;// alert you won
          } else if (allMoves[totalMoves - 1].action === 'DIE') {
            continueUpdating = false;// agent died with collected gold
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { moves, currentPositionY, currentPositionX, collectedGold, totalPoint } = this.state;

    return (
      <div>
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
