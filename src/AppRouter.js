// Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import SubmitItinerary from './pages/SubmitItinerary';
import GenerateItinerary from './pages/GenerateItinerary';
import NavigationBar from './components/NavigationBar';

export const routes = [
  { path: '/', name: 'Home', component: <Home /> },
  { path: '/Generate-Itinerary', name: 'Create Itinerary', component: <GenerateItinerary />},
  { path: '/Submit-Itinerary', name: 'Submit Itinerary', component: <SubmitItinerary />},
  { path: '/Favourites', name: 'My Favourites', component: <Favourites /> },
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