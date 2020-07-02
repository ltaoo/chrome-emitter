console.log('here is content');
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log(request.info);
//   sendResponse("我收到了你的情书，popup~");
// });

/* content script send message to popup */
// chrome.runtime.sendMessage(
//   {
//     info: "Hello Popup",
//   },
//   (res) => {
//       console.log('[receive message from popup by callback]: ', res);
//   }
// );
chrome.runtime.onConnect.addListener((port) => {
  console.log("content 连接中------------");
  port.onMessage.addListener((msg) => {
    console.log("[receive message from popup]: ", msg);
    // getAll();
    port.postMessage("Hi popup i am content");
  });
});

/* receive message from popup */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[receive message from popup', request);
  sendResponse("hello popup");
});
