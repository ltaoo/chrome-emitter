console.log('here is background');
/* popup invoke background methods */
function toPopup() {
  alert("to popup!");
}

/* background receive message from popup */
// 获取所有 tab
// const popups =
//   chrome.extension.getViews({
//     type: "popup",
//   }) || [];
// // 输出第一个使用插件页面的url
// if (popups.length) {
//   console.log(popups[0].location.href);
// }
/* background receive message from popup and operate popup page DOM */
// 使用长连接 - 监听 popup 传递来的消息
// chrome.runtime.onConnect.addListener((port) => {
//   console.log("连接中------------");
//   port.onMessage.addListener((msg) => {
//     console.log("[receive message from popup]: ", msg);
//     // getAll();
//     port.postMessage("Hi popup");
//   });
// });
// 获取所有 tab
function getAll() {
  const views = chrome.extension.getViews({
    type: "popup",
  });
  for (let o of views) {
    o.document.getElementById("pbText").innerHTML = "万圣节🎃快乐";
  }
}
