# @dong-ui/components

React自建组件库，用来帮助学习React和封装一些常用的组件。

## Features

- 基于Vite+React+TypeScript+ESLint+Prettier的React组件库开发环境
- 封装常用组件，提高开发效率
- 提供组件库文档，帮助开发者快速上手

## 依赖包

- React18
- react-transition-group
- Vite5
- TypeScript5
- ESLint8
- Prettier9

## getting started

### install

需要同时安装 react >= 18 和 react-dom >= 18。

```bash
// npm
npm install dongui

// pnpm
pnpm add dongui

// yarn
yarn add dongui


```

### use

```jsx
import { Button } from '@dong-ui/components';
import 'dongui/dist/es/Button/index.css';

function App() {
  return (
    <div>
      <Button>Hello DongUi</Button>
    </div>
  );
}
```
