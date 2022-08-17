import { useState, useEffect } from 'react';
import Header from './components/Header';
import Contents from './components/Contents';
import Footers from './components/Footers';
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';

const App = () => {
  const API_URL = 'http://localhost:3500/books';

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    // fetch(API_URL)
    //   .then((response) => response.json())
    //   .then((data) => setBook(data));

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Not receive expected data');
        const data = await response.json();
        setIsError(null);
        setBook(data);
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 3000);
  }, []);

  // const setAndSaveBook = (newItem) => {
  //   setBook(newItem);
  //   localStorage.setItem('BooksList', JSON.stringify(newItem));
  // };

  const addBook = (item) => {
    const id = book.length ? book[book.length - 1].id + 1 : 1;
    const newBook = { id, checked: false, bookName: item };
    const listBooks = [...book, newBook];
    setBook(listBooks);
  };
  const handleCheck = (id) => {
    const newListBook = book.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setBook(newListBook);
    // console.log(`key:${id}`);
  };
  const handleDelete = (id) => {
    const newListBook = book.filter((item) => item.id !== id);
    setBook(newListBook);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // add Functions

    addBook(newItem);
    setNewItem('');
  };
  return (
    <div className='App'>
      <Header title='MyBook List' />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      {isLoading && <p className='loading'>Loading...</p>}
      {isError && <p className='error'>{`Error: ${isError}`}</p>}
      <main>
        {!isError && !isLoading && (
          <Contents
            book={book.filter((item) =>
              item.bookName.toLowerCase().includes(search.toLocaleLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footers isError={isError} isLoading={isLoading} length={book.length} />
    </div>
  );
};

export default App;
