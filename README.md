# any-touch [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][downloads-url] [![size-image]][size-url] [![codecov](https://badgen.net/codecov/c/github/any86/any-touch/master)](https://codecov.io/gh/any86/any-touch) [![CircleCI](https://circleci.com/gh/any86/any-touch.svg?style=svg)](https://circleci.com/gh/any86/any-touch)

[size-image]: https://badgen.net/bundlephobia/minzip/any-touch
[size-url]: https://bundlephobia.com/result?p=any-touch
[npm-image]: https://badgen.net/npm/v/any-touch
[npm-url]: https://npmjs.org/package/any-touch
[downloads-image]: https://badgen.net/npm/dt/any-touch
[downloads-url]: https://npmjs.org/package/any-touch

:wave: 一个基于typescript实现的手势库.
- 支持更多设备: PC端 / 移动端 / [微信小程序](#支持微信小程序).
- 支持手势更全面: **tap**(点击) / **press**(按) / **pan**(拖拽) / **swipe**(划) / **pinch**(捏合) / **rotate**(旋转) 6大类手势.
- 更简单: 支持 [vue指令](#支持vue指令).
- 更放心: 代码测试覆盖率**100%**.

## 演示

![1568267671](https://user-images.githubusercontent.com/8264787/64757535-fc6da200-d564-11e9-9bf6-1ac40e08b8b7.png)

[直接访问](https://any86.github.io/any-touch/example/)

## 直达

[:zap: 快速开始](#快速开始)

[:alien: 名词解释](docs/CONCEPT.md) 

[:iphone: 支持微信小程序](#支持微信小程序)

[:seedling: 支持vue指令](#支持vue指令)

[:rocket: 更多应用](#更多应用)

[:bulb: API](docs/API.md)

[:lollipop: 事件对象(event)](docs/EVENT.md)

[:heavy_exclamation_mark::heavy_exclamation_mark::heavy_exclamation_mark: 不要用 alert 调试](#不要用alert调试)
## 安装

```javascript
npm i -S any-touch
```

## CDN

```
https://unpkg.com/any-touch/dist/AnyTouch.umd.min.js
```

## 快速开始

```javascript
import AnyTouch from "any-touch";
const el = doucument.getElementById("box");
const at = new AnyTouch(el);
// 单击
at.on("tap", ev => {
  // 阻止默认事件触发, 比如click
  ev.preventDefault();
});
```

## 更多手势
根据手势的运动方向和状态我们还支持panstart / panup / pinchin / pinchout / pressup等更多的手势事件.
```javascript
// 旋转中触发
at.on('roatemove', ev=>{});
```
[更多手势说明](/docs/GESTURE.md)

## 支持微信小程序

由于微信小程序中没有 dom 元素的概念, 所以我们需要通过`catchEvent`方法手动接收 touch 事件的事件对象来进行识别!

```xml
<view @touchstart="touchstartHandler" @touchmove="touchmoveHandler" @touchend="touchendHandler"></view>
```

```javascript
cosnt at = new AnyTouch()
{ 
    onload(){
        at.on('pinch', ev=>{
            // 缩放
        });
    },
    
    methods: {
      touchstartHandler(ev){
        at.catchEvent(ev);
      },
      touchmoveHandler(ev){
        at.catchEvent(ev);
      },
      touchendHandler(ev){
        at.catchEvent(ev);
      }
    }
}
```

## 支持vue指令

`AnyTouch.vTouch` 是一个vue指令, 对应`v-touch`指令.

```javascript
// main.js
Vue.use(AnyTouch.vTouch);
```

```html
<!-- xxx.vue -->
<div
  v-touch
  @tap="tap"
  @doubletap="doubletap"
  @press="press"
  @pan="pan"
  @pinch="pinch"
  @rotate="rotate"
  @click="click"
>
  touch
</div>
```
此时`div`上可以通过`v-on`进行手势的绑定,和绑定 click 等原生事件一样.

##### :bulb: v-touch 高级设置
我们可以通过v-touch导入AnyTouch的实例, 然后进行高级设置.
```html
<!-- xxx.vue -->
<div v-touch="importAT" @tap="tap">touch</div>
```

```javascript
export default {
  methods: {
    importAT(at) {
      const doubletap = at.get("doubletap");
      // 开启双击
      doubletap.disabled = false;
    }
  }
};
```

[示例](https://any86.github.io/any-touch/example/vue/)

## 更多应用

[基础](https://codepen.io/russell2015/pen/rRmQaw#)

[自定义手势-双击](https://codepen.io/russell2015/pen/xBrgjJ)

[全部手势展示](https://any86.github.io/any-touch/example/)

[做一个drawer(抽屉)插件](https://codepen.io/russell2015/pen/jJRbgp?editors=0010)

## 不要用alert调试

:heavy_exclamation_mark::heavy_exclamation_mark::heavy_exclamation_mark: 在安卓手机的真机上, 如果`touchstart`或`touchmove`阶段触发了`alert`, 会出现后续的`touchmove/touchend`不触发的 bug. 所以请大家务必避免在手势的事件回调中使用`alert`.
[测试代码](https://codepen.io/russell2015/pen/vYBjVNe)

如果仅仅是了在移动端调试, 请使用腾讯的[vconsole](https://github.com/Tencent/vConsole)
