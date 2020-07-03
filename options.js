console.log('here is options');

document.body.onload = () => {
  const btn = document.getElementById("btn");
  btn.onclick = () => {
    dispatch({
      type: "update",
      payload: "litao",
    });
  };
  document.getElementById("second").onclick = () => {};
};
console.log(window);
addStoreListener((action) => {
  console.log(action);
});
