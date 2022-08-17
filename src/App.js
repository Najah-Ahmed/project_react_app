import { useState, useEffect } from 'react';
import Header from './components/Header';
import Contents from './components/Contents';
import Footers from './components/Footers';
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';
import apiRequest from './api/apiRequest';

const App = () => {
  const API_URL = 'http://localhost:3500/books';

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  // *** Fetching data from the server ***

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

  // *** Adding new item to the list ***
  const addBook = async (item) => {
    const id = book.length ? book[book.length - 1].id + 1 : 1;
    const newBook = { id, checked: false, bookName: item };
    const listBooks = [...book, newBook];
    setBook(listBooks);
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) {
      setIsError(result);
    }
  };

  // *** Updating the list ***
  const handleCheck = async (id) => {
    const listBook = book.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setBook(listBook);
    const updatedBook = listBook.filter((item) => item.id === id);

    const updateOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked: updatedBook[0].checked }),
    };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, updateOptions);
    if (result) {
      setIsError(result);
    }
  };

  // *** Deleting item from the list ***
  const handleDelete = async (id) => {
    const newListBook = book.filter((item) => item.id !== id);
    setBook(newListBook);
    const deleteOptions = {
      method: 'DELETE',
    };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, deleteOptions);
    if (result) {
      setIsError(result);
    }
  };

  // *** Form Submission  ***
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
