import React,  {useState} from 'react';
import './App.css';
import Board from './Board'; 
import MainBoard from './MainBoard';
import CSVParser from './CSVParser';

function App() {
  const [csvData, setCsvData] = useState([]);

  const handleDataParsed = async(data) => {
    // Update the state with the parsed data
    setCsvData(data);
    console.log(csvData);
  };

  return (
    <div className="App" >
      <header className="App-header">
        Welcome to Wumpus World!
      </header>
      <body>
      <CSVParser onDataParsed={handleDataParsed} />
        <div className="board-container">             
            <div className='Board'><h3>Inspection Board</h3><Board /></div>
            <div className='MainBoard'><h3>Main Board</h3><MainBoard/></div>
        </div>
        
      </body>
      <footer>
        ©- Made by Muktadul, Aurchey & Rifah - 2023
      </footer>
    </div>
  );
}

export default App;
