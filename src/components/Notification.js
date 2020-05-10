import React from 'react';

const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      <div className={error ? 'error' : 'success'}>{message}</div>
    </div>
  );
};

export default Notification;
