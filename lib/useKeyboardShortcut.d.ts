export default useKeyboardShortcut;

type callbackFn = (shortcutKeys: string[]) => void;
type FlushHeldKeysFn = () => void;
declare function useKeyboardShortcut(
  shortcutKeys: string[],
  callback: callbackFn,
  options?: {
    overrideSystem?: boolean;
    ignoreInputFields?: boolean;
    repeatOnHold?: boolean;
  }
): { flushHeldKeys: FlushHeldKeysFn };
