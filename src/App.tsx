import { useEffect, useState, useRef } from 'react'
import List from './components/List'
import Form from './components/Form'

import './styles/App.css'


interface InitStateEntry {
  id: string,
  title: string,
  checked: boolean
}

function App() {
  const storedList = localStorage.getItem('TODO-LIST') || '[]';
  const initState = JSON.parse(storedList);

  const [list, setList] = useState<InitStateEntry[]>(initState);
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)!;

  const removeById = (id: string) => {
    setList(list.filter(entry => entry.id !== id)); 
  }

  useEffect(() => {
    localStorage.setItem('TODO-LIST', JSON.stringify(list))
  }, [list])

  const checkHandler = (id: string) => {
    const updList: InitStateEntry[] = list.map((entry) => {
      return entry.id === id ? 
        {
          ...entry,
          checked: !entry.checked
        } 
        : entry
    });

    setList(updList)
  }

  const handleForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(false);
    const inputValue = inputRef.current?.value;

    if (!inputValue) {
      setError(true);
      return;
    }

    const newEntry = createNewEntry(inputValue);
    setList([...list, newEntry])
  }

  const createNewEntry = (titleValue: string): InitStateEntry => {
    const newId = list.length ? list[list.length - 1].id + 1 : 1;

    return {
      id: newId.toString(),
      title: titleValue,
      checked: false
    }
  }

  const sortAsc = () => {
    const sortedList = list.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
    
      if (titleA < titleB) {
        return -1;
      }
    
      if (titleA > titleB) {
        return 1;
      }
    
      return 0;
    });
    
    setList([...sortedList])
  }

  const sortById = () => {
    const sortedList = list.sort((a, b) => {
      const idA = +a.id;
      const idB = +b.id;
    
      return idA - idB
    });
    
    setList([...sortedList])
  }

  return (
    <>
      <h1>Your TODO list:</h1>
      <Form handleForm={handleForm} error={error} inputRef={inputRef} />
      {
        list.length ? 
        <>
          <p>Sort by: </p> 
          <button onClick={() => sortAsc()}>Asc</button>
          <button onClick={() => sortById()}>Creation</button>
          <List entries={list} removeById={removeById} checkHandler={checkHandler}/>
        </>
        : <p>Use input to create first TODO</p>
      }
    </>
  )
}

export default App
