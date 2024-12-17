import './JournalItem.css';

function JournalItem({ title, date, post }) {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(date));
  };
  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{formatDate(date)}</div>
        <div className="journal-item__text">{post}</div>
      </h2>
    </>
  );
}

export default JournalItem;
