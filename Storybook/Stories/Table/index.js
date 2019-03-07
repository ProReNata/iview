import {storiesOf} from '@storybook/vue';
import UseCases from './UseCases.story.vue';

export default () => {
  storiesOf('Table', module).add('Use Cases', () => UseCases);
};
