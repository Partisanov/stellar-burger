import styles from './icon-nav-link.module.css';
import { TIconNavLink } from '../../../utils/types.ts';
import { NavLink } from 'react-router-dom';
export const IconNavLink = ({ to = '#', icon: Icon, text }: TIconNavLink) => {
  return (
    <NavLink
      to={to}
      className={`${styles.item} pt-4 pr-5 pb-4 pl-5 `}
    >
      {({ isActive }) => (
        <>
          <Icon type={isActive ? 'primary' : 'secondary'} />
          <span
            className={`text text_type_main-default ml-2 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
          >
            {text}
          </span>
        </>
      )}
    </NavLink>
  );
};
