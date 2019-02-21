import 'Storybook/.storybook/polyfill.config';
import 'Global/Config/logger.config';
import 'Storybook/.storybook/vue.config';
import 'Storybook/.storybook/iview.config';
import 'Src/styles/index.less';
import 'Storybook/CSS/styles.less';
import {configure} from '@storybook/vue';
import stories from 'Stories';

configure(stories, module);
