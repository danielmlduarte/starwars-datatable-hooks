const getPlanets = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const response = await fetch(endpoint);
    const { results } = await response.json();
    return results;
  } catch (error) {
    return error;
  }
};

export default getPlanets;
