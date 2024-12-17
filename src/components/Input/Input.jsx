import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input(
  { className, isValid = true, appearence, ...props },
  ref
) {
  return (
    <input
      className={cn(className, styles['input'], {
        [styles['invalid']]: !isValid,
        [styles['input-title']]: appearence === 'title',
      })}
      {...props}
      ref={ref}
    />
  );
});

export default Input;
