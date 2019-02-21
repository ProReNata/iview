export default {
  methods: {
    joinClasses(...args) {
      return args.filter(Boolean).join(' ');
    },
    logEvent(type, event) {
      logger.info(type, event);
    },
  },
};
