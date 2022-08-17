import ItemsList from './ItemsList';

const Contents = ({ book, handleCheck, handleDelete }) => {
  // const handleBookList = () => {
  //   const bookNames = [
  //     'richdad & poor Dad',
  //     'Never split the difference',
  //     'think and grow rich',
  //     'inteligence inverstor',
  //     'the rules of works',
  //     'the art of sublime dont fuck ',
  //   ];
  //   const inter = Math.floor(Math.random() * bookNames.length);
  //   setBook(bookNames[inter]);
  // };

  return (
    <>
      <h2>Books i want to read</h2>
      {book.length ? (
        <ItemsList
          book={book}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: '2rem' }}>No books to read</p>
      )}
    </>
  );
};

export default Contents;
