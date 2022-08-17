import { FaTrashAlt } from 'react-icons/fa';
const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <>
      <li className='item'>
        <input
          type='checkbox'
          defaultChecked={item.checked}
          onChange={() => handleCheck(item.id)}
        />
        <label
          style={item.checked ? { textDecoration: 'line-through' } : null}
          onDoubleClick={() => handleCheck(item.id)}
        >
          {item.bookName}
        </label>

        <FaTrashAlt
          role='button'
          tabIndex='0'
          onClick={() => handleDelete(item.id)}
          aria-label={`Delete ${item.bookName}`}
        />
      </li>
    </>
  );
};

export default LineItem;
