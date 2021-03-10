import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/navbar.css';

const NavBarUnreg = () => {
  const location = useLocation();
  return (
    <nav>
      <div className='nav-wrapper content-padding blue lighten-2'>
        <a href='/' className='brand-logo'>
          DCRM
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li className={location.pathname === '/rec' ? 'active' : null}>
            <a href='/rec'>Записаться</a>
          </li>
          <li className={location.pathname === '/login' ? 'active' : null}>
            <a href='/login'>Войти</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarUnreg;
