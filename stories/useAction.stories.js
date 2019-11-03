import React, { useState } from "react";
import { useAction } from "../src";
import { Fulfilled, Loading } from "../src/sideEffects";

export default { title: "useAction" };

export const Basic = () => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const login = useAction(() => {
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          login.execute(state);
        }}
      >
        <div>
          <label htmlFor="username">
            Username:{" "}
            <input
              id="username"
              type="text"
              onChange={({ target: { value: username } }) =>
                setState(prevState => ({ ...prevState, username }))
              }
              readOnly={login.isLoading}
              value={state.username}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:{" "}
            <input
              id="password"
              type="password"
              onChange={({ target: { value: password } }) =>
                setState(prevState => ({ ...prevState, password }))
              }
              readOnly={login.isLoading}
              value={state.password}
            />
          </label>
        </div>
        <div>
          <button disabled={login.isLoading} type="submit">
            Login
          </button>
        </div>
        <Loading action={login}>Logging...</Loading>
        <Fulfilled action={login}>Login successful!</Fulfilled>
      </form>
    </div>
  );
};
