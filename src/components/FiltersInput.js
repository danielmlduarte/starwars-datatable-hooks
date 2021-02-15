import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FiltersInput() {
  const {
    handleFilterByName,
    handleFilterByValues,
    handleDeleteFilter,
    filters: { filterByNumericValues },
  } = useContext(StarWarsContext);

  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const handleFilter = ({ target: { name, value } }) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleClick = () => {
    handleFilterByValues(filter);
  };

  const handleColumnSelect = () => {
    let columnFilters = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    const usedFilters = filterByNumericValues.map(({ column }) => column);
    usedFilters.forEach((usedFilter) => {
      columnFilters = columnFilters.filter((columnFilter) => columnFilter !== usedFilter);
    });
    return columnFilters
      .map((columnFilter) => (
        <option
          key={ columnFilter }
          value={ columnFilter }
        >
          { columnFilter }
        </option>
      ));
  };

  return (
    <div>
      <label htmlFor="name-filter">
        Filter by name:
        <input
          id="name-filter"
          data-testid="name-filter"
          onChange={ (event) => handleFilterByName(event) }
        />
      </label>
      <fieldset>
        <legend>Others filters:</legend>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ (event) => handleFilter(event) }
        >
          { handleColumnSelect() }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ (event) => handleFilter(event) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ (event) => handleFilter(event) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Adicionar
        </button>
      </fieldset>
      <fieldset>
        <legend>Applied filters:</legend>
        <ul>
          { filterByNumericValues
            .map(({ column, comparison, value }) => (
              <li data-testid="filter" key={ column }>
                <span>{ column }</span>
                <span>{ comparison }</span>
                <span>{ value }</span>
                <button
                  name={ column }
                  type="button"
                  onClick={ (event) => handleDeleteFilter(event) }
                >
                  X
                </button>
              </li>
            )) }
        </ul>
      </fieldset>
    </div>
  );
}

export default FiltersInput;
