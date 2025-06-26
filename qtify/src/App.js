import React from 'react';
//import './App.css';
import './index.css';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Section title="Top Albums" type="albums" showCollapseButton={true} />
      <Section title="New Albums" type="albums" showCollapseButton={true} />
      <Section title="Songs" type="songs" showCollapseButton={false} />
    </div>
  );
}

export default App;