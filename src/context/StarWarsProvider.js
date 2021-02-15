import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

import getPlanets from '../services/API';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const fetchApiData = async () => {
    setIsFetching(true);
    const result = await getPlanets();
    setData(result);
    setIsFetching(false);
  };

  const handleFilterByName = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const handleFilterByValues = (filter) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues.concat(filter),
    });
  };

  const handleDeleteFilter = ({ target: { name } }) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter(({ column }) => column !== name),
    });
  };

  const handleIsFetching = (value) => {
    setIsFetching(value);
  };

  const handleData = (value) => {
    setData(value);
  };

  const contextValue = {
    isFetching,
    data,
    filters,
    fetchApiData,
    handleIsFetching,
    handleData,
    handleFilterByName,
    handleFilterByValues,
    handleDeleteFilter,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
