import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Pages } from '../../utils/constants.ts';
import { useDispatch } from '../../hooks/redux.ts';
import { logout } from '../../services/auth/action.ts';
import styles from './profile-menu.module.css';

export const ProfileMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate(Pages.login);
      })
      .catch();
  };

  return (
    <ul className='mb-20'>
      <li className={styles.item}>
        <NavLink
          to={Pages.profile}
          end={true}
          className={({ isActive }) =>
            `${styles.link} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
          }
        >
          Профиль
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to={Pages.orders}
          end={true}
          className={({ isActive }) =>
            `${styles.link} item-link text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
          }
        >
          История заказов
        </NavLink>
      </li>
      <li className={styles.item}>
        <Link
          to='#'
          onClick={handleLogout}
          className={`${styles.link} item-link text text_type_main-medium text_color_inactive`}
        >
          Выйти
        </Link>
      </li>
    </ul>
  );
};
