import { Machine, assign } from 'xstate';

// This machine is completely decoupled from Vue
export const addressMachine = Machine({
  id: "Address",
  context: {
    cities: [],
    userCity: undefined,
    userAddress: undefined,
    addresses: []
  },
  initial: "getCities",
  states: {
    getCities: {
      invoke: {
        id: "fetch-cities",
        src: "fetchCities",
        onDone: [
          {
            target: "showAddressForm",
            actions: "citiesToContext"
          },
        ],
        onError: {
          actions: () => console.log("Error fetching cities")
        },
      }
    },
    showAddressForm: {
      on: {
        SAVE: {
          target: "saveAddress",
          cond: "canSave"
        },
        change: {
          actions: "cityToContext"
        },
        input: {
          actions: "addressToContext"
        }
      }
    },
    saveAddress: {
      invoke: {
        id: "post-address",
        src: "postAddress",
        onDone: [
          {
            target: "listAddresses",
          },
        ],
        onError: {
          actions: () => console.log("Error posting address")
        },
      }
    },
    listAddresses: {
      invoke: {
        id: "fetch-addresses",
        src: "fetchAddresses",
        onDone: [
          {
            target: "showAddresses",
            actions: "addressesToContext"
          },
        ],
        onError: {
          actions: () => console.log("Error posting address")
        },
      }
    },
    showAddresses: {
      on: {
        ADD_ADDRESS: {
          target: "showAddressForm",
          actions: "resetUserInContext"
        }
      }
    }
  }
},
{
  actions: {
    citiesToContext: assign({ cities: (context, event) => event.data }),
    addressesToContext: assign({ addresses: (context, event) => event.data }),
    cityToContext: assign({ userCity: (context, event) => event.target.value }),
    addressToContext: assign({ userAddress: (context, event) => event.target.value }),
    resetUserInContext: assign({
      userAddress: undefined,
      userCity: undefined
    }),
  },
  guards: {
    canSave: (context) => context.userCity && context.userAddress
  },
  services: {
    fetchCities: () => fetch("http://localhost:3000/cities").then(response => response.json()),
    postAddress: (context) => {
      const data = {
        city: context.userCity,
        address: context.userAddress
      };

      return fetch("http://localhost:3000/addresses", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => response.json())
    },
    fetchAddresses: () => fetch("http://localhost:3000/addresses").then(response => response.json())
  }
});
