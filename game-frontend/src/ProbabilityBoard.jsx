import React, { Component } from 'react';

class ProbabilityBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      knowledgeBase: props.knowledgeBase,
      board: props.board,
    };
  }

  // Define a function to calculate cell background color based on probability
  calculateBackgroundColor = (probability) => {
    // Define the mid-level probability range
    const midLevelMin = 0.4; // Adjust this as needed
    const midLevelMax = 0.6; // Adjust this as needed

    // Check if the probability is within the mid-level range
    if (probability >= midLevelMin && probability <= midLevelMax) {
      return 'yellow';
    } else {
      // For probabilities outside the mid-level range, use your existing logic
      const green = Math.floor(255 * (1 - probability));
      const red = Math.floor(255 * probability);
      const blue = 0;
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

  render() {
    // Check if knowledgeBase is null or undefined
    if (!this.state.knowledgeBase) {
      return null; // Return null to render nothing
    }

    const numRows = this.state.board.length;
    const numCols = this.state.board[0].length;

    // Initialize a new board with all cells having both Wumpus and Pit probabilities set to 0
    const initialBoard = Array(numRows)
      .fill()
      .map(() => Array(numCols).fill({ wumpus: 0, pit: 0 }));

    // Update the probabilities in the initial board based on knowledgeBase
    this.state.knowledgeBase.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        initialBoard[rowIndex][colIndex] = {
          wumpus: cell.wumpusProbability,
          pit: cell.pitProbability,
        };
      });
    });

    return (
      <div className="probability-board" style={{ maxHeight: '80%' }}>
        <table>
          <tbody>
            {initialBoard.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cellValues, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      backgroundColor: this.calculateBackgroundColor(
                        cellValues.wumpus
                      ),
                    }}
                  >
                    {/* Display an empty div */}
                    <div></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProbabilityBoard;
