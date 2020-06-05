<template>
  <div>
    <fieldset v-if="current.value !== 'showAddresses'">
      <select @change="event => send(event)" style="width: 100%">
        <option disabled selected>Select city</option>
        <option v-for="city in context.cities" :key="city" :value="city">{{city}}</option>
      </select>
      <input type="text" placeholder="Your Address" @input="event => send(event)" style="width: 100%"/>
      <button type="button" @click="send('SAVE')">Save</button>
    </fieldset>

    <fieldset v-else>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="address in context.addresses" :key="address.id">
            <td>{{address.id}}</td>
            <td>{{address.city}}</td>
            <td>{{address.address}}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="send('ADD_ADDRESS')">Add New</button>
    </fieldset>
  </div>
</template>
<script>
import { interpret } from 'xstate';
import { addressMachine } from "../machines/addressMachine";

export default {
  name: "UserAddress",
  created() {
      // Start service on component creation
      this.addressService
        .onTransition(state => {
          // Update the current state component data property with the next state
          this.current = state;
          console.log("state", state);
          // Update the context component data property with the updated context
          this.context = state.context;
        })
        .start();
    },
    data() {
      return {
        // Interpret the machine and store it in data
        addressService: interpret(addressMachine),

        // Start with the machine's initial state
        current: addressMachine.initialState,

        // Start with the machine's initial context
        context: addressMachine.context
      };
    },
    methods: {
      // Send events to the service
      send(event) {
        console.log("event", event)
        this.addressService.send(event);
      }
    }
}
</script>
<style>
  * {
    box-sizing: border-box;
  }
</style>
