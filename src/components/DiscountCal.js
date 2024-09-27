import React, { useState, useEffect, useRef } from 'react';
import './DiscountCal.css';
import swal from 'sweetalert';

function DiscountCal() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ title: '', message: '' });
  const confettiRef = useRef(null); // Reference to store the confetti instance

  const handleSubmit = (e) => {
    e.preventDefault();
    const cashbackAmount = 10; // Example value
    setAlertInfo({
      title: 'Transaction Complete!',
      message: `Cashback of $${cashbackAmount} has been awarded.`,
    });
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      swal(alertInfo.title, alertInfo.message, 'success').then(() => {
        // Stop the confetti animation when the SweetAlert dialog is dismissed
        if (confettiRef.current) {
          confettiRef.current.stopConfetti();
          confettiRef.current = null; // Clear reference to confetti instance
        }
      });

      // Start the confetti animation
      confettiRef.current = new Confettiful(document.querySelector('.discount-cal'));
      setShowAlert(false); // Reset showAlert after showing the alert
    }
  }, [showAlert, alertInfo]);

  return (
    <div className="discount-cal">
      <h1>Cashback Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Customer Name" required />
        <input type="number" placeholder="Order Value" required />
        <button type="submit">Calculate Cashback</button>
      </form>
    </div>
  );
}

// Confetti animation logic
const Confettiful = function (el) {
  this.el = el;
  this.containerEl = null;
  this.confettiInterval = null;

  this.confettiFrequency = 10;
  this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
  this.confettiAnimations = ['slow', 'medium', 'fast'];

  this._setupElements();
  this._renderConfetti();
};

// Setup the confetti container
Confettiful.prototype._setupElements = function () {
  const containerEl = document.createElement('div');
  const elPosition = this.el.style.position;

  if (elPosition !== 'relative' && elPosition !== 'absolute') {
    this.el.style.position = 'relative';
  }

  containerEl.classList.add('confetti-container');
  this.el.appendChild(containerEl);
  this.containerEl = containerEl;
};

// Render the confetti elements at intervals
Confettiful.prototype._renderConfetti = function () {
  this.confettiInterval = setInterval(() => {
    const confettiEl = document.createElement('div');
    const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
    const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
    const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
    const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

    confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;

    confettiEl.removeTimeout = setTimeout(() => {
      if (confettiEl.parentNode) {
        confettiEl.parentNode.removeChild(confettiEl); // Safely remove child if parent exists
      }
    }, 3000);

    if (this.containerEl) {
      this.containerEl.appendChild(confettiEl); // Safely append child if container exists
    }
  }, 25);
};

// Stop the confetti animation by clearing the interval
Confettiful.prototype.stopConfetti = function () {
  if (this.confettiInterval) {
    clearInterval(this.confettiInterval);
    this.confettiInterval = null;
  }

  // Remove all existing confetti elements safely
  if (this.containerEl) {
    while (this.containerEl.firstChild) {
      this.containerEl.removeChild(this.containerEl.firstChild);
    }
  }
};

export default DiscountCal;
