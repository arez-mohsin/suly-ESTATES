import React from 'react';
import { ArrowRightIcon } from './Icons';
import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({ children, variant = 'outline', as: Component = 'button', href, className, icon = true, ...props }) => {
  const isLink = href || Component === 'a';
  const Element = isLink ? 'a' : Component;
  
  return (
    <Element 
      href={href} 
      className={clsx(styles.button, styles[variant], className)} 
      {...props}
    >
      {children}
      {icon && <ArrowRightIcon size={18} />}
    </Element>
  );
};
