
import React from 'react';

/**
 * ErrorMessage renders a message with a close button that can be clicked to remove the message.
 * The message is centered horizontally and fixed to the top of the viewport.
 * If the message prop is falsy, nothing is rendered.
 */
const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null; 

  return (
    <div className="error-message fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-200/50 text-white p-4 rounded shadow-lg z-50">
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 bg-gray-200/75 px-3 py-1 rounded">
        Close
      </button>
    </div>
  );
};

export default ErrorMessage;
