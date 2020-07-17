# chrome-emitter

在 `chrome extension` 中使用的，一个简单的脚本间通信方式。

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

[chrome-emitter-example](https://github.com/ltaoo/chrome-emitter-example)

该示例展示了如何进行脚本间通信，以及一个截图的示例。

