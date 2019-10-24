import React, { useState, useCallback } from 'react';

import useKeyboardShortcut from 'use-keyboard-shortcut';

function App() {
  const [showImage, setShowImage] = useState(false)
  const keys = ['Shift', 'E']

  const handleKeyboardShortcut = useCallback(keys => {
    setShowImage(currentShowImage => !currentShowImage)
  }, [setShowImage])

  useKeyboardShortcut(keys, handleKeyboardShortcut)

  return (
    <div style={styles.main}>
      {showImage && (<img style={styles.image} alt="FullStackLabs Logo" src="/icon.png" />)}
      <h1 style={styles.text}>{`Press ${keys.join(' + ')} to show image.`}</h1>
    </div>
  );
}

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    background: '#2C6AFA'
  },
  text: {
    color: 'white',
    fontFamily: 'Monaco',
    fontWeight: 400,
    marginTop: 128,
    opacity: 0.5,
  },
  image: {
    height: 400,
    width: 400
  }
}

export default App;
