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
    </div>
  );
}

export default App;
