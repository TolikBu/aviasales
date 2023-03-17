import classNames from 'classnames';
import React from 'react';

import classes from './BottomBtn.module.sass';

interface ButtonProps extends React.PropsWithChildren {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => {
  return (
    <button type="button" className={classNames(classes['btn-more'], className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
