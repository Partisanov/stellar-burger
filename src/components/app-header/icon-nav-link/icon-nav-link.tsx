import styles from './icon-nav-link.module.css';
import { TIconNavLink } from '../../../utils/types.ts';
export const IconNavLink = ({
  href = '#',
  icon: Icon,
  text,
  isActive = false,
}: TIconNavLink) => {
  return (
    <a
      href={href}
      className={`${styles.item} pt-4 pr-5 pb-4 pl-5`}
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span
        className={`text text_type_main-default ml-2 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
      >
        {text}
      </span>
    </a>
  );
};
