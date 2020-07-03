console.log("here is popup");
/* popup invoke background methods */
const bg = chrome.extension.getBackgroundPage();
document.getElementById("toBackground").onclick = function () {
  bg.toPopup();
};

/* popup send message to background */
// 使用长连接
let port = chrome.runtime.connect({
  name: "hello",
});
port.postMessage("Hello background, I am popup");
/* receive message from background */
port.onMessage.addListener((msg) => {
  console.log("[receive message from background]: ", msg);
});

/* pop receive message from content script */
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log("[receive message from content]: ", req.info);
  sendResponse("我收到了你的来信");
});

/* send message to content */
document.getElementById("toContent").onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { msg: "hello content" },
      (response) => {
        console.log("4. [receive message from content]: ", response);
      }
    );
  });
};

function saveReference() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.runtime.sendMessage({
      type: "saveCurrentTab",
      tab: tabs[0],
      payload: tabs[0],
    });
    // chrome.tabs.sendMessage(
    //   tabs[0].id,
    //   { msg: "hello content" },
    //   (response) => {
    //     console.log("4. [receive message from content]: ", response);
    //   }
    // );
  });
}

// saveReference();

document.getElementById("openOptions").onclick = () => {
  dispatch({
    type: 'update',
    payload: 'litao',
  });
};
class Person {}
document.getElementById("openOptions2").onclick = () => {
  dispatch({
    type: 'update',
    payload: {
      hello: 'name',
      num: 0,
      arr: [2, 2],
      fn: () => {},
      date: new Date(),
      a: new Person(),
    },
  });
};

addStoreListener((action) => {
    console.log(action);
});
