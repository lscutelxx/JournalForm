import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialState) {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));

    if (res) {
      setData(res);
    }
  }, []);

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(data));
    setData(newData);
  };
  return [data, saveData];
}
