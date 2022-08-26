import { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "react-use";

export function useFormPersist<T = any>(prefix: string, initialState: T) {
  const [state, setState, clearState] = useLocalStorage(
    `${prefix}-form-state`,
    initialState
  );

  const updatePersist = useCallback(
    (newState: Partial<T>) => {
      setState({ ...state, ...newState } as T);
    },
    [setState, state]
  );

  // useEffect(() => {
  //   const unsubscribe = history.listen(() => {
  //     clearState();
  //   });
  //   return () => unsubscribe();
  // }, [history, clearState]);

  return [state, updatePersist] as [typeof state, typeof updatePersist];
}
