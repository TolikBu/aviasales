import classNames from 'classnames';
import React from 'react';

import classes from './BottomButton.module.sass';

interface IButtonProps extends React.PropsWithChildren {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<IButtonProps> = ({ className, onClick, children }) => {
  return (
    <button type="button" className={classNames(classes['btn-more'], className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
