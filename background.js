console.log("here is background");

const CUSTOM_EVENT_NAME = 'abc';
function dispatch(action) {
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
console.log(window);
addStoreListener((action) => {
  console.log(action);
});
