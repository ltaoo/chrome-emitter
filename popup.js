console.log("here is popup");

document.getElementById("openOptions").onclick = () => {
  dispatch({
    type: "update",
    payload: "litao",
  });
};
document.getElementById("openOptions2").onclick = () => {
  dispatch({
    type: "update",
    payload: {
      hello: "name",
      num: 0,
      arr: [2, 2],
    },
  });
};
console.log(window);
addStoreListener((action) => {
  console.log(action);
});
