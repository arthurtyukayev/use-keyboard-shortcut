## useKeyboardShortcut

[![npm version](https://badge.fury.io/js/use-keyboard-shortcut.svg)](https://badge.fury.io/js/use-keyboard-shortcut)

[Click here for a small demo!](https://use-keyboard-shortcut.netlify.com/)

A simple React hook that allows you to add keyboard shortcuts to your application.

```javascript
import React from 'react'
import useKeyboardShortcut from 'use-keyboard-shortcut'

const App = () => {
  useKeyboardShortcut(['Shift', 'H'], () => console.log('Shift + H has been pressed.'))

  return (
    <div>Hello World</div>
  )
}
```

For anothger exmaple on how to use this hook, please see the [example project](https://github.com/arthurtyukayev/use-keyboard-shortcut/tree/master/example)

### Documentation
`useKeyboardShortcut(keysArray, callback)`

`keysArray` should be an array of `KeyboardEvent.key` strings. A full list of strings can be seen [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

`callback` should be a function that is called once the keys have been pressed.

## Bugs / Problems 
[Please create an issue](https://github.com/arthurtyukayev/use-keyboard-shortcut/issues/new). 
