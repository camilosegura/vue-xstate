<template>
  <div>
    <button v-on:click="send('TOGGLE');">
      {{ current.matches("inactive") ? "Off" : "On" }}
    </button>
  </div>
</template>
<script>
import { interpret } from 'xstate';
import { toggleMachine } from "../machines/toggleMachine";

export default {
  name: "Collapsible",
  created() {
      // Start service on component creation
      this.toggleService
        .onTransition(state => {
          // Update the current state component data property with the next state
          this.current = state;
          // Update the context component data property with the updated context
          this.context = state.context;
        })
        .start();
    },
    data() {
      return {
        // Interpret the machine and store it in data
        toggleService: interpret(toggleMachine),

        // Start with the machine's initial state
        current: toggleMachine.initialState,

        // Start with the machine's initial context
        context: toggleMachine.context
      };
    },
    methods: {
      // Send events to the service
      send(event) {
        this.toggleService.send(event);
      }
    }
}
</script>
