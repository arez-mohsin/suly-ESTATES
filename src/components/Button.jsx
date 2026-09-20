import React from 'react';
import { ArrowRightIcon } from './Icons';
import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({ children, variant = 'outline', as: Component = 'button', to, href, className, icon = true, ...props }) => {
  const Element = to ? Component : (href ? 'a' : Component);
  
  return (
    <Element 
      {...(href ? { href } : {})}
      {...(to ? { to } : {})}
      className={clsx(styles.button, styles[variant], className)} 
      {...props}
    >
      {children}
      {icon && <ArrowRightIcon size={18} />}
    </Element>
  );
};
