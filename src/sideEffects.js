import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { STATUS } from "./status";

const useSideEffect = (fn, action, status, prop) => {
  useEffect(() => {
    if (action.status === status) {
      fn(action[prop]);
    }
  }, [action.status]);
};

export const useFulfilled = (fn, action) =>
  useSideEffect(fn, action, STATUS.fulfilled, "data");

export const useLoading = (fn, action) =>
  useSideEffect(fn, action, STATUS.loading, "data");

export const useInitial = (fn, action) =>
  useSideEffect(fn, action, STATUS.initial, "data");

export const useRejected = (fn, action) =>
  useSideEffect(fn, action, STATUS.rejected, "error");

const renderFn = (action, children) => {
  return typeof children === "function" ? children(action) : children;
};

const RenderWhenStatus = ({ action, children, status }) => {
  return action.status === status ? renderFn(action, children) : null;
};

export const Fulfilled = ({ action, children }) => (
  <RenderWhenStatus action={action} status={STATUS.fulfilled}>
    {children}
  </RenderWhenStatus>
);

Fulfilled.defaultProps = {
  children: null
};

Fulfilled.propTypes = {
  action: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

export const Initial = ({ action, children }) => (
  <RenderWhenStatus action={action} status={STATUS.initial}>
    {children}
  </RenderWhenStatus>
);

Initial.defaultProps = {
  children: null
};

Initial.propTypes = {
  action: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

export const Loading = ({ action, children }) => (
  <RenderWhenStatus action={action} status={STATUS.loading}>
    {children}
  </RenderWhenStatus>
);

Loading.defaultProps = {
  children: null
};

Loading.propTypes = {
  action: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

export const Rejected = ({ action, children }) => (
  <RenderWhenStatus action={action} status={STATUS.rejected}>
    {children}
  </RenderWhenStatus>
);

Rejected.defaultProps = {
  children: null
};

Rejected.propTypes = {
  action: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};
