import Alert from './components/alert';
import Button from './components/button';
import Checkbox from './components/checkbox';
import ColorPicker from './components/color-picker';
import DatePicker from './components/date-picker';
import Dropdown from './components/dropdown';
import Icon from './components/icon';
import Input from './components/input';
import InputNumber from './components/input-number';
import Scroll from './components/scroll';
import LoadingBar from './components/loading-bar';
import Modal from './components/modal';
import Notice from './components/notice';
import Progress from './components/progress';
import Radio from './components/radio';
import Slider from './components/slider';
import Spin from './components/spin';
import Switch from './components/switch';
import Tabs from './components/tabs';
import Tag from './components/tag';
import Timeline from './components/timeline';
import TimePicker from './components/time-picker';
import Tooltip from './components/tooltip';
import Transfer from './components/transfer';
import {Select, Option, OptionGroup} from './components/select';

const components = {
  Alert,
  Button,
  ButtonGroup: Button.Group,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
  ColorPicker,
  DatePicker,
  Dropdown,
  DropdownItem: Dropdown.Item,
  DropdownMenu: Dropdown.Menu,
  Icon,
  Input,
  InputNumber,
  LoadingBar,
  Modal,
  Notice,
  Option,
  OptionGroup,
  Progress,
  Radio,
  RadioGroup: Radio.Group,
  Scroll,
  Select,
  Slider,
  Spin,
  TabPane: Tabs.Pane,
  Tabs,
  Tag,
  Timeline,
  TimelineItem: Timeline.Item,
  TimePicker,
  Tooltip,
  Transfer,
};

const iview = {
  ...components,
  iButton: Button,
  iInput: Input,
  iOption: Option,
  iProgress: Progress,
  iSelect: Select,
  iSwitch: Switch,
};

const install = function(Vue) {
  if (install.installed) {
    return;
  }

  Object.keys(iview).forEach((key) => {
    Vue.component(key, iview[key]);
  });

  Vue.prototype.$Loading = LoadingBar;
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
  install,
  Switch,
  version: process.env.VERSION,
};

export default API;
