import React from 'react';

const StarChild = ({ selected, onSelect }) => {
  return (
    <span
      style={{ cursor: 'pointer', color: selected ? 'gold' : 'gray',fontSize:'3rem',margin:" 0rem 0.5rem" }}
      onClick={onSelect}
    >
      ★
    </span>
  );
};

export default StarChild;
