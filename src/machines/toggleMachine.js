import { Machine } from 'xstate';

// This machine is completely decoupled from Vue
export const toggleMachine = Machine({
  id: 'toggle',
  context: {
    toggle: false
  },
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});
