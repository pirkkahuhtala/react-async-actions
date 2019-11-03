import React from 'react';
import Actions from '../src/Actions';
import { Action } from '../src';

export default { title: 'Actions' };

export const Basic = () => (
  <Actions
    actions={{
      action1: () => new Promise(resolve => setTimeout(resolve, 2000)),
      action2: () => new Promise(resolve => setTimeout(resolve, 4000)),
      action3: () => new Promise(resolve => setTimeout(resolve, 5000)),
      action4: () => new Promise(resolve => setTimeout(resolve, 5000)),
      action5: () => new Promise(resolve => setTimeout(resolve, 1000))
    }}
  >
    {({ action1, action2, action3 }) => (
      <div>
        <div>
          <button type="button" onClick={action1.execute}>
            Action 1
          </button>{' '}
          <Actions.Initial action={action1}>Initial</Actions.Initial>
          <Actions.Loading action={action1}>Loading...</Actions.Loading>
          <Actions.Fulfilled action={action1}>Success!</Actions.Fulfilled>
        </div>
        <div>
          <button type="button" onClick={action2.execute}>
            Action 2
          </button>{' '}
          <Actions.Initial action="action2">Initial</Actions.Initial>
          <Actions.Loading action="action2">Loading...</Actions.Loading>
          <Actions.Fulfilled action="action2">Success!</Actions.Fulfilled>
        </div>
        <div>
          <button type="button" onClick={action3.execute}>
            Action 3
          </button>{' '}
          <Action action={action3}>
            <Action.Initial>Initial</Action.Initial>
            <Action.Loading>Loading...</Action.Loading>
            <Action.Fulfilled>Success!</Action.Fulfilled>
          </Action>
        </div>
        <div>
          <Actions.Pick name="action4">
            {action => (
              <>
                <button type="button" onClick={action.execute}>
                  Action 4
                </button>{' '}
                <Actions.Initial action={action}>Initial</Actions.Initial>
                <Actions.Loading action={action}>Loading...</Actions.Loading>
                <Actions.Fulfilled action={action}>Success!</Actions.Fulfilled>
              </>
            )}
          </Actions.Pick>
        </div>
        <div>
          <Actions.Pick name="action5">
            <Action.Execute>
              {({ execute }) => (
                <button type="button" onClick={execute}>
                  Action 5
                </button>
              )}
            </Action.Execute>{' '}
            <Action.Initial>Initial</Action.Initial>
            <Action.Loading>Loading...</Action.Loading>
            <Action.Fulfilled>Success!</Action.Fulfilled>
          </Actions.Pick>
        </div>
      </div>
    )}
  </Actions>
);
