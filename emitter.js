console.log('here is emitter');
// chrome.storage.onChanged.addListener((data) => {});

// const KEY = "emitter";

// function emit(eventName, ...params) {
//   console.log("invoke handler", eventName);
//   chrome.storage.local.get(KEY, (data) => {
//     const emitterMetaInfo = data[KEY];
//     const { eventMap } = emitterMetaInfo;
//     const listeners = eventMap[eventName];

//     if (listeners === undefined) {
//       console.error(eventName, "is not existed!");
//       return;
//     }

//     // console.log(listeners);
//     listeners.forEach((listener) => {
//         // new Function(listener)(...params);
//         const foo = eval(listener);
//       foo(...params);
//     });

//     // chrome.storage.local.set({
//     //     [KEY]: {
//     //         ...emitterMetaInfo,
//     //         eventMap,
//     //     },
//     // }, resolve);
//   });
//   // console.log('dispatch');
//   // chrome.storage.local.set({
//   //     '__emitter__': {
//   //         [eventName]: params,
//   //     },
//   // }, resolve);
// }
// function on(eventName, handler) {
//   // map[eventName] = handler;
//   chrome.storage.local.get(KEY, (data) => {
//     let emitterMetaInfo = data[KEY];
//     if (emitterMetaInfo === undefined) {
//         emitterMetaInfo = {
//             eventMap: {},
//         };
//     }
//     const { eventMap } = emitterMetaInfo;
//     const listeners = eventMap[eventName];

//     const listener = String(handler);

//     if (listeners === undefined) {
//       eventMap[eventName] = [listener];
//     } else {
//         if (!listeners.includes(listener)) {
//         eventMap[eventName].push(listener);
//         }
//     }
//     console.log("save handler", eventName, handler, emitterMetaInfo);
//     chrome.storage.local.set(
//       {
//           [KEY]: emitterMetaInfo,
//         // [KEY]: {
//         //   ...emitterMetaInfo,
//         //   eventMap,
//         // },
//       },
//     );
//   });
// }

// const emitter = {
//   on,
//   emit,
// };
// const state = {};
// function dispatch(action) {
//     reducer(action, state);
// }
// function reducer(action, prevState) {
//     if (action.type === 'update') {
//         prevState.name = 'litao';
//     }
// }
// const store = {
//     dispatch,
// };
function dispatch(action) {
  chrome.storage.local.set({
    __time__: new Date().valueOf(),
    __data__: {
        value: new Date().valueOf(),
        type: action.type,
        payload: action.payload,
    },
  });
}
function addStoreListener(cb) {
    chrome.storage.onChanged.addListener((changes) => {
        console.log('options', 'storage is changed', changes);
        const { __data__ } = changes;
        const nextAction = __data__.newValue;
        const { type, payload } = nextAction;
        cb({
            type,
            payload,
        });
    });
}