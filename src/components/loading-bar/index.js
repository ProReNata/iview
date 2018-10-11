import LoadingBar from './loading-bar';

let loadingBarInstance;
let color = 'primary';
let failedColor = 'error';
let height = 2;
let timer;

function getLoadingBarInstance() {
  loadingBarInstance =
    loadingBarInstance ||
    LoadingBar.newInstance({
      color,
      failedColor,
      height,
    });

  return loadingBarInstance;
}

function update(options) {
  const instance = getLoadingBarInstance();

  instance.update(options);
}

function hide() {
  setTimeout(() => {
    update({
      show: false,
    });
    setTimeout(() => {
      update({
        percent: 0,
      });
    }, 200);
  }, 800);
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

export default {
  config(options) {
    if (options.color) {
      color = options.color;
    }

    if (options.failedColor) {
      failedColor = options.failedColor;
    }

    if (options.height) {
      height = options.height;
    }
  },
  destroy() {
    clearTimer();
    const instance = getLoadingBarInstance();
    loadingBarInstance = null;
    instance.destroy();
  },
  error() {
    clearTimer();
    update({
      percent: 100,
      show: true,
      status: 'error',
    });
    hide();
  },
  finish() {
    clearTimer();
    update({
      percent: 100,
      show: true,
      status: 'success',
    });
    hide();
  },
  start() {
    if (timer) {
      return;
    }

    let percent = 0;

    update({
      percent,
      show: true,
      status: 'success',
    });

    timer = setInterval(() => {
      percent += Math.floor(Math.random() * 3 + 5);

      if (percent > 95) {
        clearTimer();
      }

      update({
        percent,
        show: true,
        status: 'success',
      });
    }, 200);
  },
  update(percent) {
    clearTimer();
    update({
      percent,
      show: true,
      status: 'success',
    });
  },
};
