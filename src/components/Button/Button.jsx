import { memo } from 'react';
import './Button.css';

function Button({ text, onClick }) {
  console.log('Button');

  return (
    <button className="button accent" onClick={onClick}>
      {text}
    </button>
  );
}

export default memo(Button);
