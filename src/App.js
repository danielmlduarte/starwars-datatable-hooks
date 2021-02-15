import React from 'react';
import Provider from './context/StarWarsProvider';
import PlanetsTable from './components/PlanetsTable';
import FiltersInput from './components/FiltersInput';
import './App.css';

function App() {
  return (
    <Provider>
      <FiltersInput />
      <PlanetsTable />
    </Provider>
  );
}

export default App;
