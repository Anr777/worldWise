import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Pricing } from "./pages/Pricing"
import { AppLayout } from "./pages/AppLayout"
import { PageNotFound } from "./pages/PageNotFound"
import { Homepage } from "./pages/HomePage"

import './index.css'
import { Login } from "./pages/Login"
import { Product } from "./pages/Product"
import { CityList } from "./components/CityList"
import { useEffect, useState } from "react"
import { CountryList } from "./components/CountryList"


const BASE_URL = 'http://localhost:9000';

export const App = () => {
  
  const [ cities, setCities ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

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
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Homepage />} />
        <Route path='product' element={ <Product />} />
        <Route path='pricing' element={ <Pricing />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/app' element={ <AppLayout />}>
          <Route index element={ <CityList cities = { cities } isLoading = { isLoading } />} />
          <Route path='cities' element={ <CityList cities = { cities } isLoading = { isLoading } />} />
          <Route path='countries' element={ <CountryList cities={ cities } isLoading={ isLoading } />} />
          <Route path='form' element={ <p>Form</p>} />
        </Route>
        <Route path='/*' element={ <PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}