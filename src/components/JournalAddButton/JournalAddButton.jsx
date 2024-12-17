import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';
import { FiPlus } from 'react-icons/fi';

function JournalAddButton({ clearForm }) {
  return (
    <CardButton className="journal-add" onClick={clearForm}>
      <FiPlus />
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
