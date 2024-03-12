import React from 'react';
import Itinerary from './components/Itinerary';
import Accommodation from './components/Accommodation';
import Transportation from './components/Transportation';
import BudgetTracker from './components/BudgetTracker';

function App() {
  return (
    <div>
      <h1>Travel Planner</h1>
      <Itinerary />
      <Accommodation />
      <Transportation />
      <BudgetTracker />
    </div>
  );
}

export default App;
