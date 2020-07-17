const SCRIPTS = {
  NONE: 0,
  CONTENT: 1,
  INJECTED: 2,
  BACKGROUND: 3,
  POPUP: 4,
  OPTIONS: 5,
};
const SCRIPT_NAMES = {
  0: "NONE",
  1: "CONTENT",
  2: "INJECTED",
  3: "BACKGROUND",
  4: "POPUP",
  5: "OPTIONS",
};
const { chrome } = window;
function checkScript() {
  if (chrome === undefined) {
    return SCRIPTS.NONE;
  }
  if (chrome.storage === undefined) {
    return SCRIPTS.INJECTED;
  }
  if (chrome.tabs === undefined) {
    return SCRIPTS.CONTENT;
  }
  const bgWindow = chrome.extension.getBackgroundPage();
  if (window === bgWindow) {
    return SCRIPTS.BACKGROUND;
  }
  const views = chrome.extension.getViews({ type: "popup" });
  if (views.length !== 0) {
    return SCRIPTS.POPUP;
  }
  return SCRIPTS.OPTIONS;
}

export function checkIsAtContentScript() {
  return checkScript() === SCRIPTS.CONTENT;
}
export function checkIsAtInjectedScript() {
  return checkScript() === SCRIPTS.INJECTED;
}
export function checkIsAtBackgroundScript() {
  return checkScript() === SCRIPTS.BACKGROUND;
}
export function checkIsAtPopup() {
  return checkScript() === SCRIPTS.POPUP;
}
export function checkIsAtOptions() {
  return checkScript() === SCRIPTS.OPTIONS;
}

export function getCurrentScriptName() {
  return SCRIPT_NAMES[checkScript()];
}

export default {
  getCurrentScriptName,
  checkIsAtBackgroundScript,
  checkIsAtInjectedScript,
  checkIsAtContentScript,
};
