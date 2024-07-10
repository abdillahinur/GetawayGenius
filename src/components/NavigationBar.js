import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../AppRouter';
import './NavigationBar.css'; // Import the CSS here

const NavigationBar = () => {
  return (
    <nav className='mb-4'>
      <ul>
        {
          routes.map((route, index) => (
            <li key={index}>
              <NavLink className="text-decoration-none text-white" to={route.path} exact activeClassName="active">
                {route.name}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default NavigationBar;
