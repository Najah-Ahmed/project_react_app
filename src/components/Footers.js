import React from 'react';

const Footers = ({ length, isError, isLoading }) => {
  // const today = new Date();
  return (
    !isError &&
    !isLoading && (
      <footer>
        <p>
          {length} {length === 1 ? ' book' : 'Books'} listed
        </p>
        {/* <p>Copyright &copy; {today.getFullYear()}</p> */}
      </footer>
    )
  );
};

export default Footers;
