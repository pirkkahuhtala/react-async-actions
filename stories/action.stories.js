import React, { useState } from "react";
import { Action } from "../src";

export default { title: "Action" };

export const Basic = () => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  return (
    <Action
      fn={() => {
        return new Promise(resolve => setTimeout(() => resolve(true), 1000));
      }}
    >
      {({ execute, isLoading }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            execute(state);
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
                readOnly={isLoading}
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
                readOnly={isLoading}
                value={state.password}
              />
            </label>
          </div>
          <div>
            <button disabled={isLoading} type="submit">
              Login
            </button>
          </div>
          <Action.Loading>Logging...</Action.Loading>
          <Action.Fulfilled>Login successful!</Action.Fulfilled>
        </form>
      )}
    </Action>
  );
};
