import { ActionMode } from "src/components/bars/action-bar";

export const handleSetMode =
  (setMode: (mode: ActionMode) => void, mode: ActionMode) => () =>
    setMode(mode);
