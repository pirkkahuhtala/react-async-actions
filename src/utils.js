import { useEffect } from "react";
import * as R from "ramda";

export const performSideEffects = (fns = []) => result =>
  fns.reduce(
    (acc, sideEffect) =>
      acc.then(() =>
        Promise.resolve(sideEffect(result)).then(R.always(result))
      ),
    Promise.resolve()
  );

export const useImmediate = (action, ...args) =>
  useEffect(() => {
    action.execute(...args);
  }, []);

export const Execute = ({ action, children }) => {
  return typeof children === "function"
    ? children({ execute: action.execute })
    : children;
};
