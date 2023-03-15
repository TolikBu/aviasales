import classNames from 'classnames';
import React from 'react';

import classes from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <div className={classNames(classes.loader, className)}></div>;
};

export default Loader;
