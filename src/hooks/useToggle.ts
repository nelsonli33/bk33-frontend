import { useState, useCallback } from "react";

export function useToggle(initialState: boolean) {
  const [open, setOpen] = useState(initialState);

  return {
    open,
    toggle: useCallback(() => setOpen((state) => !state), []),
    setTrue: useCallback(() => setOpen(true), []),
    setFalse: useCallback(() => setOpen(false), []),
  };
}
