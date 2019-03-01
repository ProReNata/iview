import {storiesOf} from '@storybook/vue';
import Variants from './Variants.story.vue';
import Icon from './Icon.story.vue';
import Dismissable from './close.story.vue';
import UseCases from './UseCases.story.vue';

export default () => {
  storiesOf('Tag', module)
    .add('Variants', () => Variants)
    .add('Icons', () => Icon)
    .add('Dismissable', () => Dismissable)
    .add('Use Cases', () => UseCases);
};
