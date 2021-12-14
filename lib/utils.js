export const overrideSystemHandling = (e) => {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  }
};

// Function stolen from this Stack Overflow answer:
// https: stackoverflow.com/a/9229821
export const uniq_fast = (a) => {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
};

// The goal for this recursive function is to check to ensure
// that the keys are held down in the correct order of the shortcut.
// I.E if the shortcut array is ["Shift", "E", "A"], this function will ensure
// that "E" is held down before "A", and "Shift" is held down before "E".
export const checkHeldKeysRecursive = (
  shortcutKey,
  // Tracks the call interation for the recursive function,
  // based on the previous index;
  shortcutKeyRecursionIndex = 0,
  shortcutArray,
  heldKeysArray
) => {
  const shortcutIndexOfKey = shortcutArray.indexOf(shortcutKey);
  const keyPartOfShortCut = shortcutArray.indexOf(shortcutKey) >= 0;

  // Early exit if they key isn't even in the shortcut combination.
  if (!keyPartOfShortCut) return false;

  // While holding down one of the keys, if another is to be let go, the shortcut
  // should be void. Shortcut keys must be held down in a specifc order.
  const comparisonIndex = Math.max(heldKeysArray.length - 1, 0);
  if (
    heldKeysArray.length &&
    heldKeysArray[comparisonIndex] !== shortcutArray[comparisonIndex]
  ) {
    return false;
  }

  // Early exit for the first held down key in the shortcut,
  // except if this is a recursive call
  if (shortcutIndexOfKey === 0) {
    // If this isn't the first interation of this recursive function, and we're
    // recursively calling this function, we should always be checking the
    // currently held down keys instead of returning true
    if (shortcutKeyRecursionIndex > 0)
      return heldKeysArray.indexOf(shortcutKey) >= 0;
    return true;
  }

  const previousShortcutKeyIndex = shortcutIndexOfKey - 1;
  const previousShortcutKey = shortcutArray[previousShortcutKeyIndex];
  const previousShortcutKeyHeld =
    heldKeysArray[previousShortcutKeyIndex] === previousShortcutKey;

  // Early exit if the key just before the currently checked shortcut key
  // isn't being held down.
  if (!previousShortcutKeyHeld) return false;

  // Recursively call this function with the previous key as the new shortcut key
  // but the index of the current shortcut key.
  return checkHeldKeysRecursive(
    previousShortcutKey,
    shortcutIndexOfKey,
    shortcutArray,
    heldKeysArray
  );
};
