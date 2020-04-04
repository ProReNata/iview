import isNil from "lodash/isNil";
import format from "./format";
import defaultLang from "./lang/sv-SE";

const t = function(...args) {
    const [path, options] = args;
    const array = path.split(".");

    let value = array.reduce((obj, key) => obj[key], defaultLang);

    if (!isNil(value)) {
        return value;
    }

    let current = defaultLang;

    const array = path.split(".");
    let current = lang;

    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];

        if (i === j - 1) {
            return format(value, options);
        }

        if (!value) {
            return "";
        }

        current = value;
    }

    return "";
};

export default t;
