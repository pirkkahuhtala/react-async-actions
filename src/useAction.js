import { useMemo } from "react";
import * as R from "ramda";
import uuid from "uuid/v4";
import useActions from "./useActions";

export default fn => {
  const id = useMemo(() => uuid(), []);
  const actions = useActions({
    [`___action___${id}`]: fn
  });
  return useMemo(
    () =>
      R.pipe(
        R.values,
        R.nth(0)
      )(actions),
    [actions]
  );
};
