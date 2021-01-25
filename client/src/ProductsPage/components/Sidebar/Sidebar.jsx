import React, { useEffect, useState } from 'react';
import '../../styles/sidebar.css';
import SidebarCategory from './SidebarCategory';
import SidebarOrderBy from './SidebarOrderBy';
import SidebarPrice from './SidebarPrice';
import SidebarSearch from './SidebarSearch';

const Sidebar = () => {
  return (
    <div className='main-container'>
      <SidebarOrderBy />
      <SidebarSearch />
      <SidebarCategory />
      <SidebarPrice />
      <div className='sticky waves-effect'>
        <span style={{ color: '#fff', fontWeight: '600' }}>
          Сбросить фильтры
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
