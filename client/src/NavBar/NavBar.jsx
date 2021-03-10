import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
import './styles/navbar.css';

const NavBar = () => {
  const location = useLocation();
  const { logout } = useAuth();
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
            <li className={location.pathname === '/rec' ? 'active' : null}>
              <a href='/rec'>Назначить прием</a>
            </li>
            <li>
              <a href='/logout' onClick={logout}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
