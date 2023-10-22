import { createContext, useContext, useEffect, useReducer } from 'react';


export const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

const reducer = ( state, action ) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter( city => city.id !== action.payload),
        currentCity: {},
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      throw new Error('Unknown action type');
  }
}

export const CitiesProvider = ({ children }) => {

  // const [ cities, setCities ] = useState([]);
  // const [ isLoading, setIsLoading ] = useState(false);
  // const [ currentCity, setCurrentCity ] = useState({});

  // USANDO LA USEREDUCER
  const [ { cities, isLoading, currentCity, error }, dispatch ] = useReducer(reducer, initialState);


  console.log(cities)
  useEffect( () => {
    
    const fetchCities = async () => {

      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({ type: 'rejected', payload: 'There was an error loading cities...' });
      }
    }

    fetchCities();
  }, []);

  const getCity = async ( id ) => {
    
    if ( Number(id) === currentCity.id ) return;
    
    dispatch({ type: 'loading' });
    try {

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data })
    } catch {
      dispatch({ type: 'rejected', payload: 'There was an error loading the city...'});
    }
    
  }

  const createCity = async (newCity) => {
    
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({ type: 'rejected', payload: 'There was an error loading the created city...'});
    }
  }


  const deleteCity = async (id) => {
    
    dispatch({ type: 'loading' });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      dispatch({ type: 'rejected', payload: 'There was an error loading the deleted city...'});
    }
  }
  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      error,
      getCity,
      createCity,
      deleteCity,
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