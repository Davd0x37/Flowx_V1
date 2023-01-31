import React, { PropsWithChildren } from 'react';

import styles from './button.module.css';

interface IOnClick {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}

export const Button = ({ children, onClick }: PropsWithChildren & IOnClick) => {
  return (
    <button className={styles.button} onClick={(e) => onClick && onClick(e)}>
      {children}
    </button>
  );
};
