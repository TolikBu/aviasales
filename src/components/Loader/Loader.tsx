import classNames from 'classnames';
import React from 'react';

import classes from './Loader.module.scss';

interface ILoaderProps {
  className?: string;
}

const Loader: React.FC<ILoaderProps> = ({ className }) => {
  return <div className={classNames(classes.loader, className)}></div>;
};

export default Loader;
