// File: src/components/SendButton.jsx
/**
 * SendButton component - triggers sending action
 */
import React from 'react';
import './SendButton.css';

function SendButton({ selectedData, onClick, isLoading }) {
  const handleClick = () => {
    if (onClick) onClick(selectedData);
  };

  return (
      <button
          className="send-button"
          onClick={handleClick}
          disabled={selectedData.length === 0 || isLoading}
      >
        {isLoading
            ? 'Sending...'
            : `Send email with tracking code`
        }
      </button>
  );
}

export default SendButton;
