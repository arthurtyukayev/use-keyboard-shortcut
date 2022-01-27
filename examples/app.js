import React, { useState, useCallback } from 'react';

import useKeyboardShortcut from 'use-keyboard-shortcut';

function App() {
  const [showImage, setShowImage] = useState(false)
  const [switchColor, setSwitchColor] = useState(false)
  const keys = ['Shift', 'E']
  const keysAlternate = ['Meta', 'C']

  const handleKeyboardShortcut = useCallback(keys => {
    setShowImage(currentShowImage => !currentShowImage)
  }, [setShowImage])

  const handleKeyboardShortcutColor = useCallback(keys => {
    setSwitchColor(currentSwitchColor => !currentSwitchColor)
  }, [setSwitchColor])

  useKeyboardShortcut(['P'], handleKeyboardShortcut)
  useKeyboardShortcut(keys, handleKeyboardShortcut)
  useKeyboardShortcut(keysAlternate, handleKeyboardShortcutColor, { overrideSystem: true })
  useKeyboardShortcut(keysAlternate, handleKeyboardShortcutColor, { ignoreElementWithClassName: ["ignoreMe1", "ignoreMe2"] })


  return (
    <div style={styles.main}>
      {showImage && (<img style={styles.image} alt="FullStackLabs Logo" src="/icon.png" href="https://fullstacklabs.co" />)}
      <h1 style={{...styles.text, ...{ color: 'white' }}}>{`Press ${keys.join(' + ')} to show image.`}</h1>
      <h1 style={{...styles.text, ...{ color: switchColor ? 'transparent' : 'white' }}}>{`Press ${keysAlternate.join(' + ')} to hide this text.`}</h1>
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
    fontFamily: 'Monaco',
    fontWeight: 400,
    opacity: 0.5,
  },
  image: {
    height: 400,
    width: 400,
    marginBottom: 128
  }
}

export default App;
