import React,  {useState} from 'react';
import './App.css';
import CSVParser from './CSVParser';
import AiMove from './AiMove';
import { useSpring, animated } from 'react-spring';
import RandomBoardByUser from './RandomBoardByUser';

function App() {
  const [clicked, setClicked] = useState(false);
  const [csvuploaded, setCsvUploaded] = useState(false);

  const handleDataParsed = async(data) => {
    // Update the state with the parsed data
    setCsvUploaded(true);
  };

  const handleClick = async() => {
    // Update the state with the parsed data
    setClicked(!clicked);
  }

  const props = useSpring({
    to: { transform: 'scale(1.2)', opacity: 1 },
    from: { transform: 'scale(1)', opacity: 0 },
  });

  return (
    <div className="App" >
      <header className="App-header">
      <animated.h1 style={props}>Hunt the Wumpus!</animated.h1>
      </header>

      <body className="App-body">
        {clicked ? 
          <div className="board-container glowing-text">
            <AiMove />
          </div> : 
          (
            <div>
              <div className="Csv-container">
                <CSVParser onDataParsed={handleDataParsed} />
              </div>
              {
                csvuploaded ? null :
                <RandomBoardByUser />
              }
              <button className="button-19" onClick={handleClick}>Start Game</button>
            </div>
          )
        } 
      </body>
      <footer>
        ©- Made by Muktadul, Aurchey & Rifah - 2023
      </footer>
    </div>
  );
}

export default App;
