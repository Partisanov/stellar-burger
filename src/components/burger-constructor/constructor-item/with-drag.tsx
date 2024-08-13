import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import { useDrag } from 'react-dnd';
import { IConstructorItemProps } from './constructor-item.tsx';
import { TargetType } from '../../../utils/types.ts';

export interface IWithDragProps {
  index: number;
  moveElement: (dragIndex: number, hoverIndex: number) => void;
  removeElement: (key: string) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const withDrag = <P extends IConstructorItemProps>(
  Component: React.ComponentType<P>,
) => {
  return (props: P & IWithDragProps) => {
    const { moveElement, index, removeElement } = props;
    const ref = useRef<HTMLDivElement>(null);

    const [{}, drop] = useDrop<
      DragItem,
      void,
      { handlerId: Identifier | null }
    >({
      accept: TargetType.SortIngredient,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: DragItem, monitor) {
        if (!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
        const newHoverIndex =
          hoverClientY < hoverMiddleY && hoverIndex === 1 ? 0 : hoverIndex;
        moveElement(dragIndex, newHoverIndex);
        item.index = newHoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: TargetType.SortIngredient,
      item: () => {
        return { id: props.item._id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
      <Component
        refItem={ref}
        isDrag={true}
        style={{ opacity }}
        handleClose={() => removeElement(props.item.key!)}
        {...props}
      />
    );
  };
};

export default withDrag;
