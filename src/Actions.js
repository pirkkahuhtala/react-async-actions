import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Fulfilled, Initial, Loading, Rejected } from './sideEffects';
import { useActions } from '.';
import { Execute } from './utils';
import Action from './Action';

const Context = React.createContext();

const getAction = (action, context) => {
  return typeof action === 'string' ? context[action] : action;
};

const Actions = ({ children, actions: providedActions }) => {
  const actions = useActions(providedActions);
  return (
    <Context.Provider value={actions}>
      {typeof children === 'function' ? children(actions) : children}
    </Context.Provider>
  );
};

Actions.defaultProps = {
  children: null
};

Actions.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Actions.Fulfilled = ({ action, children }) => (
  <Fulfilled action={getAction(action, useContext(Context))}>
    {children}
  </Fulfilled>
);

Actions.Fulfilled.defaultProps = {
  children: null
};

Actions.Fulfilled.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Actions.Initial = ({ action, children }) => (
  <Initial action={getAction(action, useContext(Context))}>{children}</Initial>
);

Actions.Initial.defaultProps = {
  children: null
};

Actions.Initial.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Actions.Loading = ({ action, children }) => (
  <Loading action={getAction(action, useContext(Context))}>{children}</Loading>
);

Actions.Loading.defaultProps = {
  children: null
};

Actions.Loading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Actions.Rejected = ({ action, children }) => (
  <Rejected action={getAction(action, useContext(Context))}>
    {children}
  </Rejected>
);

Actions.Rejected.defaultProps = {
  children: null
};

Actions.Rejected.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Actions.Execute = ({ children, action }) => (
  <Execute action={getAction(action, useContext(Context)).execute}>
    {children}
  </Execute>
);

Actions.Execute.defaultProps = {
  children: null
};

Actions.Execute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Actions.Pick = ({ children, name }) => {
  const action = useContext(Context)[name];
  return typeof children === 'function' ? (
    children(action)
  ) : (
    <Action action={action}>{children}</Action>
  );
};

Actions.Pick.defaultProps = {
  children: null
};

Actions.Pick.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  name: PropTypes.string.isRequired
};

export default Actions;
