import React from 'react';
import './App.css';
import Board from './Board'; 

function App() {

  return (
    <div className="App" >
      <header className="App-header">
        <div className="board-container">
          <Board />
        </div>
      </header>
      <footer>
        ©- Made by Muktadul, Aurchey & Rifah - 2023
      </footer>
    </div>
  );
}

export default App;
