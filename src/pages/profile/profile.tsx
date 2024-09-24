import React from 'react';
import { Page } from '../../components/page/page.tsx';
import { ProfileMenu } from '../../components/profile-menu/profile-menu.tsx';
import styles from './profile.module.css';
import { Outlet, useLocation } from 'react-router-dom';

interface IProfilePageProps {}

export const ProfilePage: React.FC<IProfilePageProps> = () => {
  const location = useLocation();
  const renderText = () => {
    if (location.pathname === '/profile') {
      return 'В этом разделе вы можете изменить свои персональные данные';
    } else if (location.pathname === '/profile/orders') {
      return 'В этом разделе вы можете просмотреть свою историю заказов';
    } else {
      return '';
    }
  };

  return (
    <Page>
      <div className={styles.wrapper}>
        <div className={`${styles.menu} mr-15`}>
          <ProfileMenu />
          <p className='text text_type_main-default text_color_inactive'>
            {renderText()}
          </p>
        </div>
        <Outlet />
      </div>
    </Page>
  );
};
