import { useEffect, useCallback, useRef, useMemo } from "react";
import {
  overrideSystemHandling,
  checkHeldKeysRecursive,
  uniq_fast
} from "./utils";

const BLACKLISTED_DOM_TARGETS = ["INPUT", "TEXTAREA"];

const DEFAULT_OPTIONS = {
  overrideSystem: false,
  ignoreInputFields: true
};

const useKeyboardShortcut = (
  shortcutKeys,
  callback,
  options = DEFAULT_OPTIONS
) => {
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

  // Normalizes the shortcut keys a deduplicated array of lowercased keys.
  const shortcutArray = useMemo(
    () => uniq_fast(shortcutKeys).map((key) => String(key).toLowerCase()),
    [shortcutKeys]
  );
  // useRef to avoid a constant re-render on keydown and keyup.
  const heldKeys = useRef([]);

  const keydownListener = useCallback(
    (keydownEvent) => {
      const loweredKey = String(keydownEvent.key).toLowerCase();
      if (!shortcutArray.includes(loweredKey)) return;

      if (keydownEvent.repeat) return;

      if (
        options.ignoreInputFields &&
        BLACKLISTED_DOM_TARGETS.includes(keydownEvent.target.tagName)
      ) {
        return;
      }
      if (options.overrideSystem) {
        overrideSystemHandling(keydownEvent);
      }

      const isHeldKeyCombinationValid = checkHeldKeysRecursive(
        loweredKey,
        null,
        shortcutArray,
        heldKeys.current
      );

      if (isHeldKeyCombinationValid) {
        heldKeys.current = [...heldKeys.current, loweredKey];
      }

      if (heldKeys.current.length === shortcutArray.length) {
        callback(shortcutKeys);
      }

      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shortcutArray, callback, options.overrideSystem, options.ignoreInputFields]
  );

  const keyupListener = useCallback(
    (keyupEvent) => {
      const raisedKey = String(keyupEvent.key).toLowerCase();
      if (!shortcutArray.includes(raisedKey)) return;

      if (
        options.ignoreInputFields &&
        BLACKLISTED_DOM_TARGETS.includes(keyupEvent.target.tagName)
      ) {
        return;
      }
      if (options.overrideSystem) {
        overrideSystemHandling(keyupEvent);
      }

      heldKeys.current = heldKeys.current.filter(
        (_, keyIndex) => keyIndex !== heldKeys.current.indexOf(raisedKey)
      );
      return false;
    },
    [shortcutArray, options.overrideSystem, options.ignoreInputFields]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownListener);
    window.addEventListener("keyup", keyupListener);
    return () => {
      window.removeEventListener("keydown", keydownListener);
      window.removeEventListener("keyup", keyupListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keydownListener, keyupListener, shortcutArray]);

  // Resets the held keys array if the shortcut keys are changed.
  useEffect(() => {
    heldKeys.current = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortcutArray]);
};

export default useKeyboardShortcut;
