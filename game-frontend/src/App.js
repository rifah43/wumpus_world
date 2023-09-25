import React from 'react';
import './App.css';
import Board from './Board'; 
import MainBoard from './MainBoard';

function App() {

  return (
    <div className="App" >
      <header className="App-header">
        Welcome to Wumpus World!
      </header>
      <body>
        <div className="board-container">
            <div className='Board'><Board /></div>
            <div className='MainBoard'><MainBoard/></div>
        </div>
      </body>
      <footer>
        ©- Made by Muktadul, Aurchey & Rifah - 2023
      </footer>
    </div>
  );
}

export default App;
