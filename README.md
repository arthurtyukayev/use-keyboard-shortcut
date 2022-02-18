## useKeyboardShortcut

[![npm version](https://badge.fury.io/js/use-keyboard-shortcut.svg)](https://badge.fury.io/js/use-keyboard-shortcut) [![testing](https://github.com/arthurtyukayev/use-keyboard-shortcut/actions/workflows/testing.js.yml/badge.svg)](https://github.com/arthurtyukayev/use-keyboard-shortcut/actions/workflows/testing.js.yml)

[Documentation | Live Example](https://use-keyboard-shortcut.tyukayev.com/)

A custom React hook that allows adding keyboard shortcuts to a React application.

```javascript
import React from 'react'
import useKeyboardShortcut from 'use-keyboard-shortcut'

const App = () => {
  const { flushHeldKeys } = useKeyboardShortcut(
    ["Shift", "H"],
    shortcutKeys => console.log("Shift + H has been pressed."),
    { 
      overrideSystem: false,
      ignoreInputFields: false, 
      repeatOnHold: false 
    }
  );

  return (
    <div>Hello World</div>
  )
}
```

### Documentation
```javascript
const { flushHeldKeys } = useKeyboardShortcut(shortcutArray, callback, options)
```
| Hook Return | Type | Description |
|--------------|-----------|------------|
| `flushHeldKeys` | `Function` | Function to flush the array of held keys used for keydown tracking. This can help fixing "stuck" keys. |

| Hook Parameter | Type | Description |
|--------------|-----------|------------|
| `shortcutArray` | `Array` | Array of `KeyboardEvent.key` strings. A full list of strings can be seen [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) |
| `callback` | `Function` | Function that is called once the keys have been pressed. |
| `options` | `Object` | Object containing some configuration options. [See options section](https://github.com/arthurtyukayev/use-keyboard-shortcut#options) |

### Options

A list of possible options to put in the options object passed as the third parameters to the hook.

| Option | Default | Description |
|--------------|-----------|------------|
| `overrideSystem` | `false` | Overrides the default browser behavior for that specific keyboard shortcut. [See caveats section](https://github.com/arthurtyukayev/use-keyboard-shortcut#caveats) |
| `ignoreInputFields` | `true` | Allows enabling and disabling the keyboard shortcuts when pressed inside of input fields. |
| `repeatOnHold` | `true` | Determines whether the callback function should fire on repeat when keyboard shortcut is held down. |

#### Caveats

**Flaky System Override Shortcuts**
There are some issues when it comes to overriding default keys such as `Meta`, `Control`, and `Alt` with more than two keys, i.e `Meta + S + F`, these combinations don't work as well as they should due to limitations set by the browsers. They have flaky performance. Using more than two keys in a keyboard shortcut works for keys that don't also handle browser actions such as `Shift + S + F`. However for keyboard shortcuts such as `Meta + S + V` will have flaky performance and some of the events  maybe bubble up to the browser and open the browser's save dialog.

Some browsers just simply ignore `Event.preventDefault()` when it comes to specific browser actions. For example, on Chrome the shortcut `Meta + S` can be prevented *sometimes* from opening the Save Dialog, however the shortcut `Meta + T` cannot be prevented from opening a new tab. _Results may vary depending on the browser._

Browser behavior that causes some sort of dialog to appear might perform poorly. During testing, the keyup listener doesn't fire in some browsers if the callback resulted in a dialog appearing. For example, creating a shortcut such as `Meta + A` that opens an `alert()`, may sometimes cause the keyup listener to not fire and cause keys to be "stuck".

## Bugs / Problems 
[Please create an issue](https://github.com/arthurtyukayev/use-keyboard-shortcut/issues/new). 
