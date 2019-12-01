import { useEffect, useCallback, useReducer } from "react";

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

const useKeyboardShortcut = (shortcutKeys, callback) => {
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

  const initalKeyMapping = shortcutKeys.reduce((currentKeys, key) => {
    currentKeys[key.toLowerCase()] = false;
    return currentKeys;
  }, {});

  const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping);

  const keydownListener = useCallback(
    keydownEvent => {
      const { key, target, repeat } = keydownEvent;
      const loweredKey = key.toLowerCase();

      if (repeat) return;
      if (blacklistedTargets.includes(target.tagName)) return;
      if (keys[loweredKey] === undefined) return;

      if (keys[loweredKey] === false)
        setKeys({ type: "set-key-down", key: loweredKey });
    },
    [keys]
  );

  const keyupListener = useCallback(
    keyupEvent => {
      const { key, target } = keyupEvent;
      const loweredKey = key.toLowerCase();

      if (blacklistedTargets.includes(target.tagName)) return;
      if (keys[loweredKey] === undefined) return;

      if (keys[loweredKey] === true)
        setKeys({ type: "set-key-up", key: loweredKey });
    },
    [keys]
  );

  useEffect(() => {
    if (!Object.values(keys).filter(value => !value).length) callback(keys);
  }, [callback, keys]);

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  useEffect(() => {
    window.addEventListener("keyup", keyupListener, true);
    return () => window.removeEventListener("keyup", keyupListener, true);
  }, [keyupListener]);
};

export default useKeyboardShortcut;
