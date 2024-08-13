import styles from './ingredients-group.module.css';
import React, { ReactNode, RefObject } from 'react';
import { TabEnum } from '../../../utils/constants.ts';

interface IIngredientsGroupProps {
  children?: ReactNode;
  title: string;
  refSection?: RefObject<HTMLLIElement>;
  tab: TabEnum;
}
export const IngredientsGroup: React.FC<IIngredientsGroupProps> = ({
  children,
  title,
  refSection,
  tab,
}) => {
  return (
    <li
      className='pt-10 pb-10'
      ref={refSection}
      data-tab={tab}
    >
      <h2 className={'text text_type_main-medium'}>{title}</h2>
      <ul className={`${styles['ingredient-list']}  pt-6 pr-4 pl-4`}>
        {children}
      </ul>
    </li>
  );
};
