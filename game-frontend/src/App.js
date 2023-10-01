import React, { useState } from 'react';
import './App.css';
import CSVParser from './CSVParser';
import AgentMoves from './AiMove';
import { useSpring, animated } from 'react-spring';

import RandomBoardByUser from './RandomBoardByUser';
import { board_data, getBoard, getCSVBoard, setRowCol, setValues, storeBoard } from './testFolder/wumpus_world/cave';

function App() {
  const [clicked, setClicked] = useState(false);
  const [csvdata, setCsvData] = useState([]);
  const [userInput, setUserInput] = useState([]); // [x, y, wumpus, pit, gold
  const [csvuploaded, setCsvUploaded] = useState(false);
  let board;
  const handleDataParsed = async (data) => {
    // Update the state with the parsed data
    setCsvUploaded(true);
    setCsvData(data);
    getCSVBoard(data);
    console.log("csv data", data);
  };

  const handleUserInput = async (data) => {
    // Update the state with the parsed data
    setUserInput(data);
    console.log(data);
    if (data) {
      console.log("data", data.gold);
      setRowCol(data.row, data.col);
      setValues(data.gold, data.wumpus, data.pit);
      getBoard();
    }
    console.log("user input", data);
  };

  const handleClick = async () => {
    // Update the state with the parsed data
    setClicked(!clicked);
  };

  const props = useSpring({
    to: { transform: 'scale(1.2)', opacity: 1 },
    from: { transform: 'scale(1)', opacity: 0 },
  });

  return (
    <div className="App">
      <header className="App-header">
        <animated.h1 style={props}>Hunt the Wumpus!</animated.h1>
      </header>

      <body className="App-body">
        {clicked ? (
          <div className="board-container glowing-text">
            <AgentMoves csvdata={csvdata} userInput={userInput} />
          </div>
        ) : (
          <div>
            <div className="Csv-container">
              <CSVParser onDataParsed={handleDataParsed} />
            </div>
            {csvuploaded ? null : (
              <RandomBoardByUser onUserInput={handleUserInput} />
            )}
            <button className="button-19" onClick={handleClick}>
              Start Game
            </button>
          </div>
        )}
      </body>
      <footer>
        ©- Made by Muktadul, Aurchey & Rifah - 2023
      </footer>
    </div>
  );
}

export default App;
