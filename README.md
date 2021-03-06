## useKeyboardShortcut

[![npm version](https://badge.fury.io/js/use-keyboard-shortcut.svg)](https://badge.fury.io/js/use-keyboard-shortcut)

[Click here for a small demo!](https://use-keyboard-shortcut.netlify.com/)

A custom React hook that allows adding keyboard shortcuts to a React application.

```javascript
import React from 'react'
import useKeyboardShortcut from 'use-keyboard-shortcut'

const App = () => {
  useKeyboardShortcut(['Shift', 'H'], () => console.log('Shift + H has been pressed.'), { overrideSystem: false })

  return (
    <div>Hello World</div>
  )
}
```

For another example on how to use this hook, please see the [example project](https://github.com/arthurtyukayev/use-keyboard-shortcut/tree/master/example)

### Documentation
`useKeyboardShortcut(keysArray, callback)`

`keysArray` should be an array of `KeyboardEvent.key` strings. A full list of strings can be seen [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

`callback` should be a function that is called once the keys have been pressed.

`options` an object containing some configuration options.


### Options

A list of possible options to put in the options object passed as the third parameters to the hook.

`overrideSystem` overrides the default browser behavior for that specific keyboard shortcut

## Bugs / Problems 
[Please create an issue](https://github.com/arthurtyukayev/use-keyboard-shortcut/issues/new). 
