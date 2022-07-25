import React from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'

import ProtectedRoutes from './routes/protected-routes';
import PublicRoutes from './routes/public-route';
import { protectedRoutes, publicRoutes, admin, doctors } from './routes/routes';
import Login from './pages/login';
import NotFound from './pages/notfound';
import { history } from './helpers';
import Customer from './pages/home/index'


const App = () => {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (

    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path={"customer"} element={<Customer />} />


      <Route path="" element={<ProtectedRoutes />}>
        {
          admin.map(route => {
            return <Route path={`${route.path}/`} element={route.component} />

          })
        }
      </Route>

      <Route path="" element={<ProtectedRoutes />}>
        {
          doctors.map(route => {
            return <Route path={`${route.path}/*`} element={route.component} />

          })
        }
      </Route>
      {
        publicRoutes.map(route => {
          return <Route path={route.path} element={<PublicRoutes />}>
            <Route path={`/${route.path}`} element={route.component} />
          </Route>
        })
      }

    </Routes>



  )
}

export default App;