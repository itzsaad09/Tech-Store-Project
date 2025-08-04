import React from 'react';

// The updated CSS with a "sorry" expression for the animated '0' face.
const styles = `
  body {
    background-color: #f0f0f0;
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .container {
    text-align: center;
  }
  .number {
    font-size: 10em;
    color: #2c3e50;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  }
  .number .face {
    position: relative;
    width: 1em;
    height: 1em;
    background: radial-gradient(circle at 50% 50%, #5d8aa8, #2a4768);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(93, 138, 168, 0.5), 0 5px 15px rgba(0,0,0,0.2);
    margin: 0 0.1em;
    animation: droop 4s ease-in-out infinite;
  }
  .number .face::before, .number .face::after {
    content: '';
    position: absolute;
    background-color: #fff;
  }
  /* Eyes - Now drooping to express sadness */
  .number .face::before {
    width: 0.25em;
    height: 0.15em;
    top: 0.4em;
    left: 0.22em;
    border-radius: 50% / 100% 100% 0 0;
    box-shadow: 0.5em 0 0 #fff; /* Right eye */
    animation: blink 4s infinite ease-in-out;
    transform-origin: center bottom;
    transform: rotate(10deg);
  }
  /* Mouth - Now a frown */
  .number .face::after {
    width: 0.5em;
    height: 0.2em;
    background: #fff;
    bottom: 0.3em;
    left: 0.25em;
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    transform-origin: center top;
    animation: sad-frown 4s infinite ease-in-out;
  }
  .message {
    font-size: 2.5em;
    color: #7f8c8d;
    margin-top: 20px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  @keyframes droop {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(0.05em) rotate(-1deg); }
  }
  @keyframes blink {
    0%, 20%, 40%, 100% { transform: scaleY(1) rotate(10deg); opacity: 1; }
    50% { transform: scaleY(0.1) rotate(10deg); opacity: 0.8; }
  }
  @keyframes sad-frown {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.9); }
  }
`;

/**
 * A React component for a creative 404 "Page Not Found" page.
 * It features a custom animated face for the '0' character,
 * constructed entirely with CSS.
 */
const App = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="container">
        <div className="number">
          4
          <span className="face"></span>
          4
        </div>
        <div className="message">
          Page not found
        </div>
      </div>
    </>
  );
};

export default App;
