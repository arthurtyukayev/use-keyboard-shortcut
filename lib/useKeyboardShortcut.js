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
  console.count("useKeyboardShortcut");

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
    (assignedKey) => (keydownEvent) => {
      const loweredKey = String(assignedKey).toLowerCase();
      if (loweredKey !== String(keydownEvent.key).toLowerCase()) return;

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
        callback(heldKeys.current);
      }

      return false;
    },
    [shortcutArray, callback, options.overrideSystem, options.ignoreInputFields]
  );

  const keyupListener = useCallback(
    (assignedKey) => (keyupEvent) => {
      const raisedKey = String(assignedKey).toLowerCase();
      if (String(keyupEvent.key).toLowerCase() !== raisedKey) return;

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
    [options.overrideSystem, options.ignoreInputFields]
  );

  useEffect(() => {
    shortcutKeys.forEach((k) =>
      window.removeEventListener("keydown", keydownListener(k))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...shortcutKeys, keydownListener]);

  useEffect(() => {
    shortcutKeys.forEach((k) =>
      window.removeEventListener("keyup", keyupListener(k))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...shortcutKeys, keydownListener]);

  useEffect(() => {
    shortcutKeys.forEach((k) =>
      window.addEventListener("keydown", keydownListener(k))
    );
    // return () =>
    //   shortcutKeys.forEach((k) =>
    //     window.removeEventListener("keydown", keydownListener(k))
    //   );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...shortcutKeys, keydownListener]);

  useEffect(() => {
    shortcutKeys.forEach((k) =>
      window.addEventListener("keyup", keyupListener(k))
    );
    // return () =>
    //   shortcutKeys.forEach((k) =>
    //     window.removeEventListener("keyup", keyupListener(k))
    //   );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...shortcutKeys, keyupListener]);
};

export default useKeyboardShortcut;
