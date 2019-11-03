import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useAction from './useAction';
import { Fulfilled, Initial, Rejected, Loading } from './sideEffects';
import { Execute } from './utils';

const Context = React.createContext();

const Action = ({ action: providedAction, children, fn }) => {
  const action = useAction(fn);
  return (
    <Context.Provider value={providedAction || action}>
      {typeof children === 'function' ? children(action) : children}
    </Context.Provider>
  );
};

Action.defaultProps = {
  action: undefined,
  children: null,
  fn: () => {}
};

Action.propTypes = {
  action: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  fn: PropTypes.func
};

Action.Fulfilled = ({ children }) => (
  <Fulfilled action={useContext(Context)}>{children}</Fulfilled>
);

Action.Fulfilled.defaultProps = {
  children: null
};

Action.Fulfilled.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Action.Initial = ({ children }) => (
  <Initial action={useContext(Context)}>{children}</Initial>
);

Action.Initial.defaultProps = {
  children: null
};

Action.Initial.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Action.Loading = ({ children }) => (
  <Loading action={useContext(Context)}>{children}</Loading>
);

Action.Loading.defaultProps = {
  children: null
};

Action.Loading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Action.Rejected = ({ children }) => (
  <Rejected action={useContext(Context)}>{children}</Rejected>
);

Action.Rejected.defaultProps = {
  children: null
};

Action.Rejected.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Action.Execute = ({ children }) => {
  const action = useContext(Context);
  return <Execute action={action}>{children}</Execute>;
};

Action.Execute.defaultProps = {
  children: null
};

Action.Execute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

export default Action;
