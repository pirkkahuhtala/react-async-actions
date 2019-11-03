import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as R from "ramda";
import { STATUS } from "./status";

const decorateExecute = R.over(R.lensProp("execute"));

const mapExecute = (map, action) =>
  decorateExecute(fn => val => map(val, fn), action);

const mapExecuteArgs = (map, action) =>
  mapExecute((val, execute) => execute(...map(val)), action);

const initialState = {
  data: undefined,
  error: undefined,
  status: STATUS.initial,
  isWaiting: false
};

const actionLens = actionName =>
  R.lens(R.prop(actionName), R.assoc(actionName));

const set = (actionName, value, state) =>
  R.set(actionLens(actionName), value, state);

const get = (actionName, state) =>
  R.view(actionLens(actionName), state) || initialState;

const useActions = actions => {
  const [state, setState] = useState({});
  const isMounted = useRef(true);

  const doSetState = useCallback(
    R.curry(
      (reducer, actionName) =>
        isMounted.current &&
        setState(prevState =>
          set(actionName, reducer(get(actionName, prevState)), prevState)
        )
    )
  );

  const cancel = useCallback(
    doSetState(initialState)
  );

  const clearError = useCallback(doSetState(R.assoc("error", undefined)), []);

  const prepare = useCallback(
    doSetState(prevState =>
      prevState.status === STATUS.loading
        ? prevState
        : {
            data: undefined,
            error: undefined,
            status: STATUS.initial,
            isWaiting: true
          }
    ),
    []
  );

  const execute = useCallback(async (actionName, fn, ...args) => {
    const setActionState = R.flip(doSetState)(actionName);
    setActionState(
      R.mergeLeft({
        data: undefined,
        status: STATUS.loading
      })
    );
    try {
      const response = await fn(...args);
      setActionState(
        R.always({
          data: response,
          error: undefined,
          isWaiting: false,
          status: STATUS.fulfilled
        })
      );
    } catch (error) {
      setActionState(
        R.mergeLeft({
          error,
          status: STATUS.rejected
        })
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useMemo(
    () =>
      R.toPairs(actions).reduce((acc, [actionName, action]) => {
        const { data, error, isWaiting, status } = get(actionName, state);
        return R.mergeRight(acc, {
          [actionName]: {
            cancel: () => cancel(actionName),
            clearError: () => clearError(actionName),
            data,
            prepare: () => prepare(actionName),
            error,
            execute: (...args) => execute(actionName, action, ...args),
            isInitial: status === STATUS.initial,
            isFulfilled: status === STATUS.fulfilled,
            isLoading: status === STATUS.loading,
            isRejected: status === STATUS.rejected,
            isWaiting,
            status,
            mapExecArgs(fn) {
              return mapExecuteArgs(fn, this);
            }
          }
        });
      }, {}),
    [state]
  );
};

export default useActions;
