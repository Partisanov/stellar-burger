import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { IconNavLink } from './icon-nav-link/icon-nav-link.tsx';
export const AppHeader = () => {
  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <div className={styles.header_container}>
        <nav>
          <ul className={styles['header_nav-list']}>
            <li>
              <IconNavLink
                icon={BurgerIcon}
                text='Конструктор'
                isActive
              />
            </li>
            <li>
              <IconNavLink
                icon={ListIcon}
                text='Лента заказов'
              />
            </li>
          </ul>
        </nav>
        <Logo />
        <IconNavLink
          icon={ProfileIcon}
          text='Личный кабинет'
        />
      </div>
    </header>
  );
};
