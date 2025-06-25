import React from 'react';
import styles from './Button.module.css'; // Make sure this path is correct

/**
 * Reusable Button component for the QTify application.
 * It displays text and applies specific styling based on design requirements.
 *
 * @param {object} props - The component props.
 * @param {string} props.children - The text to be displayed inside the button.
 * Using 'children' prop makes it flexible for any content.
 */
function Button({ children }) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}

export default Button;