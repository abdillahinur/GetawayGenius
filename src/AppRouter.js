// Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import NavigationBar from './components/NavigationBar';

export const routes = [
  { path: '/', name: 'Home', component: <Home /> },
  { path: '/favourites', name: 'My Favourites', component: <Favourites /> },
];

const AppRouter = () => {
  return (
    <Router>
      <NavigationBar />

      <div className='container'>
        <Routes>

          {
            routes.map((route) => {
              return (
                <Route path={route.path} exact element={route.component} />
              );
            })
          }
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;