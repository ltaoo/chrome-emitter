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
// 使用postMs 发送信息
port.postMessage("Hello background");
// 接收信息
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
    chrome.tabs.sendMessage(tabs[0].id, { msg: 'hello content' }, (response) => {
      console.log('[receive message from content]: ', response);
    });
  });
};
