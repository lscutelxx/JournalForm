import './JournalList.css';
import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };
  const filteredItems = useMemo(
    () => items.filter((el) => el.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (items.length === 0) {
    return <p>Воспоминаний нет. Добавте первое!</p>;
  }

  return (
    <>
      {filteredItems.map((item) => (
        <CardButton key={item.id} onClick={() => setItem(item)}>
          <JournalItem title={item.title} date={item.date} post={item.post} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
