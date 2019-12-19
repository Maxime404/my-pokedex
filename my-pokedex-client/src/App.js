import React from 'react';
import Pokemons from './Pokemons';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Pokemons />
      </header>
    </div>
  );
}

export default App;
