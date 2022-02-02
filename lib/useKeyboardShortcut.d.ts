export default useKeyboardShortcut;

type callbackFn = (heldKeys: string[]) => void;
declare function useKeyboardShortcut(
  shortcutKeys: string[],
  callback: callbackFn,
  options?: {
    overrideSystem?: boolean;
    ignoreInputFields?: boolean;
    ignoreElementWithClassName?: string[];
  }
): void;
