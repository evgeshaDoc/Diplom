import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/navbar.css';

const NavBar = () => {
  const location = useLocation();
  return (
    <header>
      <nav>
        <div className='nav-wrapper content-padding blue lighten-2'>
          <a href='/' className='brand-logo'>
            DCRM
          </a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li
              className={
                location.pathname === '/appointments' ? 'active' : null
              }
            >
              <a href='/appointments'>Приемы</a>
            </li>
            <li className={location.pathname === '/products' ? 'active' : null}>
              <a href='/products'>Прайс-лист</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
