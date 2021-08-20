import React, {
  createContext,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Snackbar } from "@material-ui/core";
import ErrorBox from "@components/ErrorBox";

type SnackErrorValue = (config: { message: string }) => () => void;

interface Snack {
  id: number;
  open: boolean;
  message: string;
}

export const SnackContext = createContext<SnackErrorValue>(() => () => {});

let currentId = 0;

const SnackProvider: React.FC = memo(({ children }) => {
  const [snacks, setSnacks] = useState<Snack[]>([]);

  const close = useCallback((id: number) => {
    setSnacks((v) => {
      const newV = v.slice();
      const i = v.findIndex((s) => s.id === id);
      const oldSnack = newV[i];
      if (oldSnack) {
        newV[i] = { ...oldSnack, open: false };
      }
      return newV;
    });
  }, []);

  const destroy = useCallback(
    (id: number) => setSnacks((v) => v.filter(({ id: vId }) => vId !== id)),
    []
  );

  const show = useCallback(
    (config: { message: string }): (() => void) => {
      const id = currentId;
      setSnacks((v) => v.concat({ ...config, id, open: true }));
      currentId += 1;
      return () => close(id);
    },
    [close]
  );

  const snackEls = useMemo(
    () =>
      snacks.map((snack) => (
        <Snackbar
          key={snack.id}
          open={snack.open}
          onExited={() => destroy(snack.id)}>
          <ErrorBox onClose={() => close(snack.id)}>{snack.message}</ErrorBox>
        </Snackbar>
      )),
    [destroy, snacks, close]
  );

  return (
    <SnackContext.Provider value={show}>
      {children}
      {snackEls}
    </SnackContext.Provider>
  );
});

export default SnackProvider;
