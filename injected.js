const CUSTOM_EVENT_NAME = "abc";
const SPECIAL_CUSTOM_EVENT_NAME = "abcd";
function dispatch(action) {
  let eventName = SPECIAL_CUSTOM_EVENT_NAME;
  if (chrome && chrome.extension) {
    eventName = CUSTOM_EVENT_NAME;
  }
  console.log("[injected script]", "dispatch", action, eventName);
  window.dispatchEvent(
    new CustomEvent(eventName, {
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

console.log("[injected script]", window.loadJs);

addStoreListener((action) => {
  console.log("i am injected script", action);
});
