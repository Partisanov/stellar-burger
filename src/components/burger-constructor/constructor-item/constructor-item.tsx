import React, { CSSProperties, RefObject } from 'react';
import { TData } from '../../../utils/types.ts';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-item.module.css';
import withDrag, { IWithDragProps } from './with-drag.tsx';

export interface IConstructorItemProps {
  refItem?: RefObject<HTMLDivElement>;
  isDrag?: boolean;
  item: TData;
  isLocked: boolean;
  type?: 'top' | 'bottom';
  style?: CSSProperties;
  handleClose?: () => void;
}

export const ConstructorItem: React.FC<IConstructorItemProps> = ({
  refItem,
  isDrag = false,
  item,
  isLocked,
  type,
  style,
  handleClose,
}) => {
  const name =
    item.name +
    (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '');
  return (
    <div
      ref={refItem}
      style={style}
      className={styles.element}
    >
      <div className={styles.drag}>{isDrag && <DragIcon type='primary' />}</div>
      <ConstructorElement
        extraClass='ml-8'
        type={type}
        isLocked={isLocked}
        handleClose={handleClose}
        text={name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
};

export const ConstructorItemWithDrag: React.FC<
  IConstructorItemProps & IWithDragProps
> = withDrag(ConstructorItem);
