import React, { PropsWithChildren } from 'react';

interface IOnClick {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}

export const Button = ({ children, onClick }: PropsWithChildren & IOnClick) => {
  return (
    <button
      className="text-color-default bg-shade-light hover:bg-accent-light hover:text-color-light border-accent-dark rounded border p-2 transition"
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
};
