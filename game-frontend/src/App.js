import React,  {useState} from 'react';
import './App.css';
import Board from './Board'; 
import MainBoard from './MainBoard';
import CSVParser from './CSVParser';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [clicked, setClicked] = useState(false);

  const handleDataParsed = async(data) => {
    // Update the state with the parsed data
    setCsvData(data);
  };

  return (
    <div className="App" >
      <header className="App-header">
        Welcome to Wumpus World!
      </header>
      <body className="App-body">
        {clicked ? <div className="board-container">
          <div className='Board'><h3>Inspection Board</h3><Board /></div>
          <div className='MainBoard'><h3>Main Board</h3><MainBoard/></div>
          </div> : 
          <div className="Csv-container">
            <CSVParser onDataParsed={handleDataParsed} />
            <button className="button-19" role="button" onClick={() => setClicked(!clicked)}>Start Game</button>
          </div>
        } 
      </body>
      <footer>
        ©- Made by Muktadul, Aurchey & Rifah - 2023
      </footer>
    </div>
  );
}

export default App;
