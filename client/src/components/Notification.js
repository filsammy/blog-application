// src/components/Notification.js
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

// Create a single Notyf instance (so we don’t create multiple instances everywhere)
const notyf = new Notyf({
  duration: 3000,
  dismissible: true,
  types: [
    {
      type: 'success',
      background: '#042e12ff', // dark red for gothic theme
      icon: false             // remove default icon if you like
    },
    {
      type: 'error',
      background: '#4a0404',  // black background
      icon: false,
      ripple: false,       // text color
    }
  ]
});

// Export helper functions
export const notifySuccess = (message) => {
  notyf.success(message);
};

export const notifyError = (message) => {
  notyf.error(message);
};
