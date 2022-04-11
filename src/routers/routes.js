import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from '../containers/Home'
import Stock from '../containers/Stock'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Tools from '../containers/Tools'
import AddProduct from '../containers/AddProduct'
import SearchProduct from '../containers/SearchProduct'
import User from '../containers/User'
import NotFoundPage from '../containers/NotFoundPage'

const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("stock-token") !== null;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const RoutesApp = () => {
   return(
	<BrowserRouter>
	 <Routes>
	 	<Route  path="/" element={<Home/>}/>
	 	<Route  path="/login" element={<Login/>}/>
	 	<Route  path="/register" element={<Register/>}/>
	 	<Route  path="/stock" element={<PrivateRoute redirectTo="/login"> <Stock/> </PrivateRoute>}/>
	 	<Route  path="/ferramenta" element={<PrivateRoute redirectTo="/login"> <Tools/> </PrivateRoute>}/>
	 	<Route  path="/ferramenta/cadastrar-produto" element={<PrivateRoute redirectTo="/login"> <AddProduct/> </PrivateRoute>}/>
	 	<Route  path="/ferramenta/buscar-produto" element={<PrivateRoute redirectTo="/login"> <SearchProduct/> </PrivateRoute>}/>
	 	<Route  path="/user" element={<PrivateRoute redirectTo="/login"> <User/> </PrivateRoute>}/>


	 	<Route  path="/*" element={<NotFoundPage/>}/>
	 </Routes>
	</BrowserRouter>
   )
}

export default RoutesApp;

