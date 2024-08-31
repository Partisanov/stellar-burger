import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { IconNavLink } from './icon-nav-link/icon-nav-link.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store.ts';
import { Pages } from '../../utils/constants.ts';
import { Link } from 'react-router-dom';
export const AppHeader = () => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.auth);

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <div className={styles.header_container}>
        <nav>
          <ul className={styles['header_nav-list']}>
            <li>
              <IconNavLink
                icon={BurgerIcon}
                text='Конструктор'
                to={Pages.home}
              />
            </li>
            <li>
              <IconNavLink
                icon={ListIcon}
                text='Лента заказов'
                to={Pages.order}
              />
            </li>
          </ul>
        </nav>
        <Link to={Pages.home}>
          <Logo />
        </Link>
        <IconNavLink
          icon={ProfileIcon}
          text={email ? email : 'Личный кабинет'}
          to={Pages.profile}
        />
      </div>
    </header>
  );
};
