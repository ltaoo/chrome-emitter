# chrome-emitter

一个简单的 `chrome` 通信方式。

## Usage

```bash
yarn add chrome-emitter
```

```js
const emitter = require('chrome-emitter');
// 监听事件
emitter.on('reload', () => {
    window.location.reload();
});
// 发出事件
emitter.emit('reload');
```

## Example


