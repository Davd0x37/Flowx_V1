import React, { PropsWithChildren } from 'react';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}

export const Button = ({
  children,
  onClick,
  type,
}: PropsWithChildren & ButtonProps & React.ComponentProps<'button'>) => {
  return (
    <button
      className="rounded bg-emerald-600 p-2 px-4 py-2 text-sm font-medium text-emerald-50 transition hover:bg-emerald-700"
      onClick={(e) => onClick && onClick(e)}
      type={type}
    >
      {children}
    </button>
  );
};
