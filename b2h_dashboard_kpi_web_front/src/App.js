import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './scss/style.scss';

const loading = (
       <div className="pt-3 text-center">
              <div className="sk-spinner sk-spinner-pulse"></div>
       </div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function useAuth() {
       const token = localStorage.getItem('Token');
       return token;
}

function App() {
       const token = useAuth();
       const [, refreshTokenSet] = useState();
       const navigate = useNavigate();

       useEffect(() => {
              if (!token) {
                     navigate('/login');
              }
       }, [token, navigate]);

       return (
              <Suspense fallback={loading}>
                     <Routes>
                            <Route path="/login" element={token ? <Navigate to="/" /> : <Login refreshTokenSet={refreshTokenSet} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/404" element={<Page404 />} />
                            <Route path="/500" element={<Page500 />} />
                            <Route path="*" element={token ? <DefaultLayout /> : <Navigate to="/login" />} />
                     </Routes>
              </Suspense>
       );
}

export default App;
