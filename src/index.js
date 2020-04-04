import Button from "./components/button";
import Checkbox from "./components/checkbox";
import ColorPicker from "./components/color-picker";
import DatePicker from "./components/date-picker";
import Dropdown from "./components/dropdown";
import Input from "./components/input";
import InputNumber from "./components/input-number";
import Scroll from "./components/scroll";
import Radio from "./components/radio";
import Spin from "./components/spin";
import Switch from "./components/switch";
import Time from "./components/time";
import TimePicker from "./components/time-picker";
import Tooltip from "./components/tooltip";
import Transfer from "./components/transfer";
import Tree from "./components/tree";
import Upload from "./components/upload";
import { Row, Col } from "./components/grid";
import { Select, Option, OptionGroup } from "./components/select";

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
    TimePicker
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

const install = function(Vue) {
    if (install.installed) {
        return;
    }

    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key]);
    });

    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Notice = Notice;
    Vue.prototype.$Spin = Spin;
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

const API = {
    ...components,
    Circle,
    install,
    Switch,
    version: process.env.VERSION
};

export default API;
