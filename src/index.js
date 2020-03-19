import Button from './components/button';
import Checkbox from './components/checkbox';
import ColorPicker from './components/color-picker';
import DatePicker from './components/date-picker';
import Dropdown from './components/dropdown';
import Input from './components/input';
import InputNumber from './components/input-number';
import Scroll from './components/scroll';
import Radio from './components/radio';
import Spin from './components/spin';
import Switch from './components/switch';
import Time from './components/time';
import TimePicker from './components/time-picker';
import {Select, Option} from './components/select';
import locale from './locale/index';

const components = {
    Button,
    ButtonGroup: Button.Group,
    Checkbox,
    ColorPicker,
    DatePicker,
    Dropdown,
    DropdownItem: Dropdown.Item,
    DropdownMenu: Dropdown.Menu,
    Input,
    InputNumber,
    Scroll,
    Option: Option,
    Radio,
    RadioGroup: Radio.Group,
    Select,
    Spin,
    Time,
    TimePicker,
};

const iview = {
    ...components,
    iButton: Button,
    iInput: Input,
    iOption: Option,
    iSelect: Select,
    iSwitch: Switch,
    iTime: Time
};

const install = function(Vue, opts = {}) {
    if (install.installed) return;
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key]);
    });

    Vue.prototype.$IVIEW = {
        size: opts.size || '',
        transfer: 'transfer' in opts ? opts.transfer : ''
    };
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    i18n: locale.i18n,
    install,
    ...components
};

API.lang = (code) => {
    const langObject = window['iview/locale'].default;
    if (code === langObject.i.locale) locale.use(langObject);
    else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
