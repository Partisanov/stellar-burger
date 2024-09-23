import React from 'react';
import styles from './ingredient-image.module.css';

interface IIngredientImageProps {
  src: string;
  alt: string;
}

export const IngredientImage: React.FC<IIngredientImageProps> = ({
  src,
  alt,
}) => {
  return (
    <div className={styles.icon}>
      <img
        src={src}
        alt={alt}
      />
    </div>
  );
};
