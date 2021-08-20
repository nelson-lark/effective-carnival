import { useContext, useEffect, useMemo, useRef } from "react";

import { SnackContext } from "./SnackProvider";

interface UseSnackContext {
  close(): void;
  show(options: { message: string }): void;
}

const useSnackContext = (): UseSnackContext => {
  const closeRef = useRef<() => void>();
  const showSnack = useContext(SnackContext);
  useEffect(() => () => closeRef.current?.(), []);
  return useMemo<UseSnackContext>(
    () => ({
      close: () => {
        closeRef.current?.();
        closeRef.current = undefined;
      },
      show: (options) => {
        closeRef.current?.();
        closeRef.current = showSnack(options);
      },
    }),
    [showSnack]
  );
};

export default useSnackContext;
