import Vue from 'vue';

// For Modal scrollBar hidden
let cached;
export function getScrollBarSize(fresh) {
  if (Vue.prototype.$isServer) {
    return 0;
  }

  if (fresh || typeof cached === 'undefined') {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = '0';
    outerStyle.left = '0';
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }

  return cached;
}

// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500) {
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start, end, scrollStep) {
    if (start === end) {
      return;
    }

    let d = start + scrollStep > end ? end : start + scrollStep;

    if (start > end) {
      d = start - scrollStep < end ? end : start - scrollStep;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }

    window.requestAnimationFrame(() => scroll(d, end, scrollStep));
  }

  scroll(from, to, step);
}

// Find components upward
function findComponentUpward(context, componentName, names) {
  let componentNames = names;

  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let optionName = parent.$options.name;
  while (parent && (!optionName || componentNames.indexOf(optionName) < 0)) {
    parent = parent.$parent;

    if (parent) {
      optionName = parent.$options.name;
    }
  }

  return parent;
}

export {findComponentUpward};

// Find component downward
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const child of childrens) {
      const {name} = child.$options;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);

        if (children) {
          break;
        }
      }
    }
  }

  return children;
}

// Find components downward
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }

    const foundChilds = findComponentsDownward(child, componentName);

    return components.concat(foundChilds);
  }, []);
}

// Find components upward
export function findComponentsUpward(context, componentName) {
  const parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent);
    }

    return parents.concat(findComponentsUpward(parent, componentName));
  }

  return [];
}

// Find brothers components
export function findBrothersComponents(context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter((item) => item.$options.name === componentName);
  /* eslint-disable-next-line no-underscore-dangle */
  const index = res.findIndex((item) => item._uid === context._uid);

  if (exceptMe) {
    res.splice(index, 1);
  }

  return res;
}
