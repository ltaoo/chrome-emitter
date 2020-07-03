console.log("here is content");

/* ----- common chunk start ----- */
const CUSTOM_EVENT_NAME = "abc";
const SPECIAL_CUSTOM_EVENT_NAME = "abcd";
function dispatch(action) {
  let eventName = SPECIAL_CUSTOM_EVENT_NAME;
  if (chrome && chrome.extension) {
    eventName = CUSTOM_EVENT_NAME;
  }
  window.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_NAME, {
      detail: action,
    })
  );
  if (chrome === undefined || chrome.storage === undefined) {
    return;
  }
  chrome.storage.local.set({
    __time__: new Date().valueOf(),
    __data__: {
      value: new Date().valueOf(),
      type: action.type,
      payload: action.payload,
    },
  });
}
window.dispatch = dispatch;
function addStoreListener(cb) {
  window.addEventListener(CUSTOM_EVENT_NAME, function (event) {
    cb(event.detail);
  });
  if (chrome === undefined || chrome.storage === undefined) {
    return;
  }
  chrome.storage.onChanged.addListener((changes) => {
    const { __data__ } = changes;
    const nextAction = __data__.newValue;
    const { type, payload } = nextAction;
    cb({
      type,
      payload,
    });
  });
}
window.addStoreListener = addStoreListener;
window.addEventListener(SPECIAL_CUSTOM_EVENT_NAME, function (event) {
  dispatch(event.detail);
});
/* ----- common chunk end ----- */

function loadJs(src, cb) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;

    document.documentElement.appendChild(script);

    script.onload = () => {
      if (cb) {
        cb(null);
      }
      resolve();
    };
    script.onerror = (error) => {
      if (cb) {
        cb(error, null);
      }
      reject();
    };
  });
}
console.log("[content script]", window.loadJs);
loadJs(chrome.extension.getURL("injected.js"), () => {
  dispatch({
    type: "hello",
    payload: "injected script",
  });
});
addStoreListener((action) => {
  console.log(action);
});
