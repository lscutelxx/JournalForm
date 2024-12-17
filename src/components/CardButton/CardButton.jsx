import './CardButton.css';

function CardButton({ children, className, ...props }) {
  const cls = 'card-button' + (className ? ' ' + className : '');
  return (
    <div {...props} className={cls}>
      {children}
    </div>
  );
}

export default CardButton;
