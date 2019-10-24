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
    currentKeys[key] = false;
    return currentKeys;
  }, {});

  const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping);

  const keydownListener = useCallback(
    keydownEvent => {
      const { key, target, repeat } = keydownEvent;
      if (repeat) return;
      if (blacklistedTargets.includes(target.tagName)) return;
      if (!shortcutKeys.includes(key)) return;

      if (!keys[key])
        setKeys({ type: "set-key-down", key });
    },
    [shortcutKeys, keys]
  );

  const keyupListener = useCallback(
    keyupEvent => {
      const { key, target } = keyupEvent;
      if (blacklistedTargets.includes(target.tagName)) return;
      if (!shortcutKeys.includes(key)) return;

      if (keys[key])
        setKeys({ type: "set-key-up", key });
    },
    [shortcutKeys, keys]
  );

  useEffect(() => {
    if (!Object.values(keys).filter(value => !value).length) callback(keys)
  }, [callback, keys])

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
