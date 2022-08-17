import LineItem from './LineItem';

const ItemsList = ({ book, handleCheck, handleDelete }) => {
  return (
    <>
      <ul>
        {book.map((item) => (
          <LineItem
            key={item.id}
            item={item}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default ItemsList;
