import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routine from './contexts/routine/components/Routine';
import Calendar from './contexts/calendar/components/Calendar';

function App() {

  return (
    <div className="App">
      <h1 className="app-header">xRout.Life</h1>

      <Routine />
      <Calendar />
    </div>
  );
}

//show = {this.state.show}

export default App;
