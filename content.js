console.log("here is content");

/* content script send message to popup */
// 这个实现不了吧，往往页面打开时，popup 是没有打开的，如果 background 中有监听，其实是 background 响应了这个广播
// chrome.runtime.sendMessage(
//   {
//     info: "Hello popup, I am content",
//   },
//   (reply) => {
//     console.log("[receive reply from popup]: ", reply);
//   }
// );

/* receive message from popup */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("1.", "[receive message from popup]: ", request.msg);
  sendResponse();
  //   chrome.runtime.sendMessage(
  //     {
  //       type: "test",
  //       info: "Hello background, I am content inner receive message from pop",
  //     },
  //     (reply) => {
  //         console.log("3. [receive reply from background]: ", reply);
  //       sendResponse(reply);
  //     }
  //   );
  return true;
});

/* send message to background */
// console.log("send message to background when loaded");
// chrome.runtime.sendMessage(
//   {
//     info: "Hello background, I am content",
//   },
//   (reply) => {
//     console.log("[receive reply from background]: ", reply);
//   }
// );

// const port = chrome.runtime.connect({
//     name: "content",
// });
// port.onMessage.addListener((msg) => {
//     console.log('content', "[receive message from background]: ", msg);
// });

chrome.storage.sync.get('status', (data) => {
    console.log(data);
});

chrome.storage.onChanged.addListener((changed) => {
    console.log('content', 'storage is changed', changed);
});
