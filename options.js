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

addStoreListener((action) => {
  console.log(action);
});
