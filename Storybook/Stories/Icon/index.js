import {storiesOf} from '@storybook/vue';
import IconRegular from './Icon.story.1.vue';
import IconSolid from './Icon.story.2.vue';
import IconLight from './Icon.story.3.vue';
import IconFixedWidth from './Icon.story.4.vue';

export default () => {
  storiesOf('Icon', module)
    .add('Regular', () => IconRegular)
    .add('Solid', () => IconSolid)
    .add('Light', () => IconLight)
    .add('Fixed Width', () => IconFixedWidth);
};
