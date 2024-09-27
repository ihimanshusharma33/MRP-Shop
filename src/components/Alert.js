import React, { useState, useEffect } from 'react';
import './Alert.css';

const CustomAlert = ({ isOpen, onClose, title, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000); // Auto close after 3 seconds
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`custom-alert-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="custom-alert">
        <div className="custom-alert-icon"></div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default CustomAlert;