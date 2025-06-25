import React from 'react';
//import './App.css';
import './index.css';

// Import your Navbar and Hero components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';

function App() {
  return (
    <div className="App"> {/* Keep this div, but remove the default header content inside it */}
      {/*
        DELETE ALL THE DEFAULT CREATE REACT APP HEADER CONTENT BELOW THIS LINE:
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        AND REPLACE IT WITH YOUR COMPONENTS:
      */}
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;