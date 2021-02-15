import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function PlanetsTable() {
  const {
    isFetching,
    data,
    fetchApiData,
    filters,
  } = useContext(StarWarsContext);

  useEffect(() => {
    if (!data.length) fetchApiData();
  }, [data, fetchApiData]);

  const { filterByName: { name }, filterByNumericValues } = filters;

  const filteredByValues = () => {
    let newData = [...data];
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      newData = newData.filter((planet) => {
        if (comparison === 'maior que') {
          return parseFloat(planet[column]) > parseFloat(value);
        }
        if (comparison === 'menor que') {
          return parseFloat(planet[column]) < parseFloat(value);
        }
        return parseFloat(planet[column]) === parseFloat(value);
      });
    });
    return newData;
  };

  const filteredByName = () => {
    const planets = (!filterByNumericValues.length) ? data : filteredByValues();
    return (
      planets.filter((planet) => planet.name.includes(name)).map((planet) => (
        <tr key={ planet.name }>
          { Object.entries(planet).filter((entry) => entry[0] !== 'residents')
            .map((entry) => <td key={ entry[0] }>{entry[1]}</td>) }
        </tr>
      ))
    );
  };

  return (
    <div>
      { (isFetching) && 'Loading...' }
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { filteredByName() }
        </tbody>
      </table>
    </div>
  );
}

export default PlanetsTable;
