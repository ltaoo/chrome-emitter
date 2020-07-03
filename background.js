console.log("here is background");
/* popup invoke background methods */
// function toPopup() {
//   alert("to popup!");
// }

/* background receive message from popup */
// chrome.runtime.onConnect.addListener((port) => {
//   console.log("连接中------------", port);
//   port.onMessage.addListener((msg) => {
//     console.log("[receive message from popup??]: ", msg);
//     port.postMessage("Hi popup??");
//   });
// });

// let currentTab = null;
// /* receive message from content or popup or options? */
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   const { to, type, payload } = request;
//   console.log("[receive message from content??]: ", request, sender);
//   // report message
//   if (type === "saveCurrentTab") {
//     console.log('background', 'save reference');
//     currentTab = payload;
//   }
//   if (type === "test") {
//     sendResponse("reply message from popup through content");
//     return;
//   }
//   if (to === "content") {
//     sendMessageToContent(request);
//     sendResponse();
//     return;
//   }
//   sendResponse("hello content");
//   return true;
// });

// function sendMessageToContent(action) {
//   // const views;
//   // const views = chrome.extension.getViews();
//   // console.log(views);
//   console.log(currentTab);
//   if (currentTab === null) {
//     //
//     console.log(
//       "[background]",
//       "not save currentTab, please open option page from popup"
//     );
//     return;
//   }

//   chrome.tabs.sendMessage(
//     currentTab.id,
//     { msg: "hello content" },
//     (response) => {
//       console.log("background", "[receive reply from content]: ", response);
//     }
//   );
// }
// setTimeout(() => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, { msg: 'hello content' }, (response) => {
//       console.log('background', '[receive reply from content]: ', response);
//     });
//   });
//   // chrome.runtime.sendMessage({
//   //   to: 'content',
//   // }, (data) => {
//   //   console.log('background', 'reply from content?', data);
//   // });
// }, 5000);

// chrome.storage.onChanged.addListener(() => {
//     console.log('background', 'storage is changed');
// });
