import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Pricing } from "./pages/Pricing"
import { AppLayout } from "./pages/AppLayout"
import { PageNotFound } from "./pages/PageNotFound"
import { Homepage } from "./pages/HomePage"

import './index.css'
import { Login } from "./pages/Login"
import { Product } from "./pages/Product"
import { CityList } from "./components/CityList"
import { CountryList } from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { useContext } from "react"
import { CitiesProvider } from "./contexts/CitiesContext"



export const App = () => {
  
  

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Homepage />} />
          <Route path='product' element={ <Product />} />
          <Route path='pricing' element={ <Pricing />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/app' element={ <AppLayout />}>
            <Route index element={ <Navigate replace to='cities' />} />
            <Route path='cities' element={ <CityList />} />
            <Route path='cities/:id' element={ <City />} />
            <Route path='countries' element={ <CountryList  />} />
            <Route path='form' element={ <Form />} />
          </Route>
          <Route path='/*' element={ <PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}
