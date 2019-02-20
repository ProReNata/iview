import not from 'Global/Assets/not';

function broadcast(componentName, eventName, params) {
  /* eslint-disable-next-line babel/no-invalid-this */
  this.$children.forEach((child) => {
    const {name} = child.$options;

    if (name === componentName) {
      child.$emit(...[eventName].concat(params));
    } else {
      // Todo If params is an empty array, the received will be undefined
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let optName = parent.$options.name;

      while (parent && (not(optName) || optName !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          optName = parent.$options.name;
        }
      }

      if (parent) {
        parent.$emit(...[eventName].concat(params));
      }
    },
  },
};
