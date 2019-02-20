import 'Global/Config';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/pro-solid-svg-icons';
import {far} from '@fortawesome/pro-regular-svg-icons';
import {fal} from '@fortawesome/pro-light-svg-icons';
// noinspection ES6CheckImport
import {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText} from '@fortawesome/vue-fontawesome';
import Affix from 'Components/affix';
import Alert from 'Components/alert';
import AutoComplete from 'Components/auto-complete';
import Avatar from 'Components/avatar';
import BackTop from 'Components/back-top';
import Badge from 'Components/badge';
import Breadcrumb from 'Components/breadcrumb';
import Button from 'Components/button';
import Card from 'Components/card';
import Carousel from 'Components/carousel';
import Cascader from 'Components/cascader';
import Checkbox from 'Components/checkbox';
import Circle from 'Components/circle';
import Collapse from 'Components/collapse';
import ColorPicker from 'Components/color-picker';
import Content from 'Components/content';
import DatePicker from 'Components/date-picker';
import Dropdown from 'Components/dropdown';
import Footer from 'Components/footer';
import Form from 'Components/form';
import Header from 'Components/header';
import Icon from 'Components/icon';
import Input from 'Components/input';
import InputNumber from 'Components/input-number';
import Scroll from 'Components/scroll';
import Layout from 'Components/layout';
import LoadingBar from 'Components/loading-bar';
import Menu from 'Components/menu';
import Message from 'Components/message';
import Modal from 'Components/modal';
import Notice from 'Components/notice';
import Page from 'Components/page';
import Poptip from 'Components/poptip';
import Progress from 'Components/progress';
import Radio from 'Components/radio';
import Rate from 'Components/rate';
import Richtext from 'Components/richtext';
import Sider from 'Components/sider';
import Slider from 'Components/slider';
import Spin from 'Components/spin';
import Steps from 'Components/steps';
import Switch from 'Components/switch';
import Table from 'Components/table';
import Tabs from 'Components/tabs';
import Tag from 'Components/tag';
import Timeline from 'Components/timeline';
import TimePicker from 'Components/time-picker';
import Tooltip from 'Components/tooltip';
import Transfer from 'Components/transfer';
import Tree from 'Components/tree';
import Upload from 'Components/upload';
import {Row, Col} from 'Components/grid';
import {Select, Option, OptionGroup} from 'Components/select';
import * as locale from './locale';

library.add(fas);
library.add(far);
library.add(fal);

const components = {
  Affix,
  Alert,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  BreadcrumbItem: Breadcrumb.Item,
  Button,
  ButtonGroup: Button.Group,
  Card,
  Carousel,
  CarouselItem: Carousel.Item,
  Cascader,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
  Col,
  Collapse,
  ColorPicker,
  Content,
  DatePicker,
  Dropdown,
  DropdownItem: Dropdown.Item,
  DropdownMenu: Dropdown.Menu,
  Footer,
  Form,
  FormItem: Form.Item,
  Header,
  Icon,
  Input,
  InputNumber,
  Layout,
  LoadingBar,
  Menu,
  MenuGroup: Menu.Group,
  MenuItem: Menu.Item,
  Message,
  Modal,
  Notice,
  Option,
  OptionGroup,
  Page,
  Panel: Collapse.Panel,
  Poptip,
  Progress,
  Radio,
  RadioGroup: Radio.Group,
  Rate,
  Richtext,
  Row,
  Scroll,
  Select,
  Sider,
  Slider,
  Spin,
  Step: Steps.Step,
  Steps,
  Submenu: Menu.Sub,
  Table,
  TabPane: Tabs.Pane,
  Tabs,
  Tag,
  Timeline,
  TimelineItem: Timeline.Item,
  TimePicker,
  Tooltip,
  Transfer,
  Tree,
  Upload,
};

const iview = {
  ...components,
  iButton: Button,
  iCircle: Circle,
  iCol: Col,
  iContent: Content,
  iFooter: Footer,
  iForm: Form,
  iHeader: Header,
  iInput: Input,
  iMenu: Menu,
  iOption: Option,
  iProgress: Progress,
  iSelect: Select,
  iSwitch: Switch,
  iTable: Table,
};

const install = function _install(Vue, opts = {}) {
  if (install.installed) {
    return;
  }

  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  Object.keys(iview).forEach((key) => {
    Vue.component(key, iview[key]);
  });

  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.component('font-awesome-layers', FontAwesomeLayers);
  Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

  Vue.prototype.$Loading = LoadingBar;
  Vue.prototype.$Message = Message;
  Vue.prototype.$Modal = Modal;
  Vue.prototype.$Notice = Notice;
  Vue.prototype.$Spin = Spin;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  ...components,
  Circle,
  i18n: locale.i18n,
  install,
  locale: locale.use,
  Switch,
  version: process.env.VERSION,
};

API.lang = (code) => {
  const langObject = window['iview/locale'].default;

  if (code === langObject.i.locale) {
    locale.use(langObject);
  } else {
    /* eslint-disable-next-line no-console */
    console.log(`The ${code} language pack is not loaded.`);
  }
};

export default API;
