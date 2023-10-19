import { createContext, useContext, useEffect, useState } from 'react';


export const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000';


export const CitiesProvider = ({ children }) => {

  const [ cities, setCities ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ currentCity, setCurrentCity ] = useState({});


  console.log(cities)
  useEffect( () => {
    
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities( data );
      } catch {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  const getCity = async ( id ) => {
    
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity( data );
    } catch {
      alert('There was an error loading data...');
    } finally {
      setIsLoading(false);
    }
    
  }

  const createCity = async (newCity) => {
    
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCities( (cities) => [...cities, data]);
    } catch ( err ) {
      alert('There was an error loading data...');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
      createCity
    }}>
      { children }
    </CitiesContext.Provider>
  )

}

export const useCities = () => {
  const context = useContext(CitiesContext);
  if ( context === undefined ) throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}