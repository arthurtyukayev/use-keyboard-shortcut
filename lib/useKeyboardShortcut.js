import { useEffect, useCallback, useReducer } from "react";
import { disabledEventPropagation } from './utils'

const blacklistedTargets = ["INPUT", "TEXTAREA"];

const keysReducer = (state, action) => {
  switch (action.type) {
    case "set-key-down":
      return { ...state, [action.key]: true };
    case "set-key-up":
      return { ...state, [action.key]: false };
    default:
      return state;
  }
};

const useKeyboardShortcut = (shortcutKeys, callback, options) => {
  if (!Array.isArray(shortcutKeys))
    throw new Error(
      "The first parameter to `useKeyboardShortcut` must be an ordered array of `KeyboardEvent.key` strings."
    );

  if (!shortcutKeys.length)
    throw new Error(
      "The first parameter to `useKeyboardShortcut` must contain atleast one `KeyboardEvent.key` string."
    );

  if (!callback || typeof callback !== "function")
    throw new Error(
      "The second parameter to `useKeyboardShortcut` must be a function that will be envoked when the keys are pressed."
    );

  const { overrideSystem } = options || {}
  const initalKeyMapping = shortcutKeys.reduce((currentKeys, key) => {
    currentKeys[key.toLowerCase()] = false;
    return currentKeys;
  }, {});

  const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping);

  const keydownListener = useCallback(
    assignedKey => keydownEvent => {
      const loweredKey = assignedKey.toLowerCase();
      
      if (loweredKey !== keydownEvent.key.toLowerCase()) return;
      if (blacklistedTargets.includes(keydownEvent.target.tagName)) return;
      if (keys[loweredKey] === undefined) return;

      if (overrideSystem) {
        keydownEvent.preventDefault();
        disabledEventPropagation(keydownEvent);
      }

      if (keys[loweredKey] === false)
        setKeys({ type: "set-key-down", key: loweredKey });
      return false;
    },
    [keys, overrideSystem]
  );

  const keyupListener = useCallback(
    assignedKey => keyupEvent => {
      const loweredKey = assignedKey.toLowerCase();

      if (keyupEvent.key.toLowerCase() !== loweredKey) return;
      if (blacklistedTargets.includes(keyupEvent.target.tagName)) return;
      if (keys[loweredKey] === undefined) return;

      if (overrideSystem) {
        keyupEvent.preventDefault();
        disabledEventPropagation(keyupEvent);
      }

      if (keys[loweredKey] === true)
        setKeys({ type: "set-key-up", key: loweredKey });
      return false;
    },
    [keys, overrideSystem]
  );

  useEffect(() => {
    if (!Object.values(keys).filter(value => !value).length) callback(keys);
  }, [callback, keys]);

  useEffect(() => {
    shortcutKeys.forEach(k => window.addEventListener("keydown", keydownListener(k)));
    return () => shortcutKeys.forEach(k => window.removeEventListener("keydown", keydownListener(k)));
  }, []);

  useEffect(() => {
    shortcutKeys.forEach(k => window.addEventListener("keyup", keyupListener(k)));
    return () => shortcutKeys.forEach(k => window.removeEventListener("keyup", keyupListener(k)));
  }, []);
};

export default useKeyboardShortcut;
