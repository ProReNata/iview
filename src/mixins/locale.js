import {t} from 'Src/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    },
  },
};
