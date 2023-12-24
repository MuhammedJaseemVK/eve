import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Map from './components/Map';
import { useSelector } from "react-redux"
import Spinner from "./components/Spinner";
import Home from './pages/Home';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <div className='h-screen'>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ToastContainer />
            <Routes>
              <Route path='/' element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>} />
              <Route path='/register' element={
                <PublicRoute>
                  <Register />
                </PublicRoute>} />
              <Route path='/login' element={
                <PublicRoute>
                  <Login />
                </PublicRoute>} />
              <Route path='/login' element={
                <PublicRoute>
                  <Login />
                </PublicRoute>} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App