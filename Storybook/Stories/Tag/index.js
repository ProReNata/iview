import {storiesOf} from '@storybook/vue';
import Colors from './Colors.story.vue';
import Borders from './Borders.story.vue';
import Icon from './Icon.story.vue';
import Closable from './close.story.vue';

export default () => {
  storiesOf('Tag', module)
    .add('Color', () => Colors)
    .add('Border', () => Borders)
    .add('Icons', () => Icon)
    .add('Closable', () => Closable);
};
