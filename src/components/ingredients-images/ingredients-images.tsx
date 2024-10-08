import React from 'react';
import styles from './ingredients-images.module.css';
import { IngredientImage } from '../ingredient-image/ingredient-image.tsx';
import { useImageById } from '../../hooks/ingredients.ts';

interface IIngredientIconProps {
  ingredients: string[];
}

export const IngredientsImages: React.FC<IIngredientIconProps> = ({
  ingredients,
}) => {
  const maxVisibleImages = 6;
  const remainingCount = ingredients.length - maxVisibleImages;

  return (
    <ul className={styles.wrap}>
      {ingredients
        .slice(0, maxVisibleImages)
        .map((id: string, index: number) => {
          const img = useImageById(id);
          if (img) {
            return (
              <li
                key={index}
                style={{
                  position: 'relative',
                  marginLeft: index === 0 ? 0 : '-16px',
                  zIndex: maxVisibleImages - index,
                }}
              >
                <IngredientImage
                  src={img.image}
                  alt={img.name}
                />
                {index === maxVisibleImages - 1 && remainingCount > 0 && (
                  <div
                    className={styles.count}
                    style={{
                      zIndex: maxVisibleImages + 1,
                    }}
                  >
                    <p className="text text_type_digits-default">
                      +{remainingCount}
                    </p>
                  </div>
                )}
              </li>
            );
          }
          return null;
        })}
    </ul>
  );
};
