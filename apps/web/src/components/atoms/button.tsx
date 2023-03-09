import React, { PropsWithChildren } from 'react';

import css from './button.module.css';

interface IOnClick {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}

export const Button = ({ children, onClick }: PropsWithChildren & IOnClick) => {
  return (
    <button className={css.button} onClick={(e) => onClick && onClick(e)}>
      {children}
    </button>
  );
};
