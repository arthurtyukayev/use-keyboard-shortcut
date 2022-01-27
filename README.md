## useKeyboardShortcut

[![npm version](https://badge.fury.io/js/use-keyboard-shortcut.svg)](https://badge.fury.io/js/use-keyboard-shortcut) [![testing](https://github.com/arthurtyukayev/use-keyboard-shortcut/actions/workflows/testing.js.yml/badge.svg)](https://github.com/arthurtyukayev/use-keyboard-shortcut/actions/workflows/testing.js.yml)

[Click here for a small demo!](https://use-keyboard-shortcut.tyukayev.com/)

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

### Documentation
```javascript
useKeyboardShortcut(shortcutArray, callback, options)
```

| Parameter | Type | Description |
|--------------|-----------|------------|
| `shortcutArray` | `Array` | Array of `KeyboardEvent.key` strings. A full list of strings can be seen [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) |
| `callback` | `Function` | Function that is called once the keys have been pressed. |
| `options` | `Object` | Object containing some configuration options. [See options section](https://github.com/arthurtyukayev/use-keyboard-shortcut#options) |

### Options

A list of possible options to put in the options object passed as the third parameters to the hook.

| Option | Default | Description |
|--------------|-----------|------------|
| `overrideSystem` | `false` | Overrides the default browser behavior for that specific keyboard shortcut. |
| `ignoreInputFields` | `true` | Allows disabling and disabling the keyboard shortcuts when pressed inside of input fields. |
| `ignoreElementWithClassName` | [] | Allows disabling keyboard shortcuts when pressed inside of an element with the specified CSS-class. |

## Bugs / Problems 
[Please create an issue](https://github.com/arthurtyukayev/use-keyboard-shortcut/issues/new). 
