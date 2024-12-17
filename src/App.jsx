import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import addId from './utils/addId';
import useLocalStorage from './hooks/use-lokalstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function App() {
  const [items, setItems] = useLocalStorage('data', []);
  const [selectedItem, setSelectedItem] = useState({});

  function addItemHandler(newItem) {
    if (!newItem.id) {
      setItems([...items, addId(newItem)]);
    } else {
      setItems([
        ...items.map((i) => {
          if (i.id === newItem.id) {
            return {
              ...newItem,
            };
          }
          return i;
        }),
      ]);
    }
  }

  const deleteItem = (id) => {
    setItems([...items.filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={items} setItem={setSelectedItem}></JournalList>
        </LeftPanel>
        <Body>
          <JournalForm
            addItem={addItemHandler}
            data={selectedItem}
            onDelete={deleteItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
