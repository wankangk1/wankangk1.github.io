import React, { useEffect, useState } from "react"
import { Layout, List, Icon, Tag, Skeleton, Typography } from "antd"
import { useHistory, NavLink } from "react-router-dom"
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons"
import { useRequest } from "@umijs/hooks"
import { getIssues } from "../../request/index"
import "./index.less"
const { Header, Content, Footer, Sider } = Layout
const { Paragraph } = Typography
const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)
export default (props) => {
  let history = useHistory()
  const data = [
    {
      url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/7",
      repository_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io",
      labels_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/7/labels{/name}",
      comments_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/7/comments",
      events_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/7/events",
      html_url: "https://github.com/astonishqft/astonishqft.github.io/issues/7",
      id: 551935102,
      node_id: "MDU6SXNzdWU1NTE5MzUxMDI=",
      number: 7,
      title: "拖拽神器React DnD你真的了解了吗？",
      user: {
        login: "astonishqft",
        id: 15138753,
        node_id: "MDQ6VXNlcjE1MTM4NzUz",
        avatar_url: "https://avatars2.githubusercontent.com/u/15138753?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/astonishqft",
        html_url: "https://github.com/astonishqft",
        followers_url: "https://api.github.com/users/astonishqft/followers",
        following_url: "https://api.github.com/users/astonishqft/following{/other_user}",
        gists_url: "https://api.github.com/users/astonishqft/gists{/gist_id}",
        starred_url: "https://api.github.com/users/astonishqft/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/astonishqft/subscriptions",
        organizations_url: "https://api.github.com/users/astonishqft/orgs",
        repos_url: "https://api.github.com/users/astonishqft/repos",
        events_url: "https://api.github.com/users/astonishqft/events{/privacy}",
        received_events_url: "https://api.github.com/users/astonishqft/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 1707699242,
          node_id: "MDU6TGFiZWwxNzA3Njk5MjQy",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/javascript",
          name: "javascript",
          color: "006b75",
          default: false,
          description: "",
        },
        {
          id: 1926781734,
          node_id: "MDU6TGFiZWwxOTI2NzgxNzM0",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/react",
          name: "react",
          color: "bf23db",
          default: false,
          description: "react",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 2,
      created_at: "2020-01-19T15:03:57Z",
      updated_at: "2020-03-22T15:05:33Z",
      closed_at: null,
      author_association: "OWNER",
      body:
        "<p>最近在研究用 React 绘制拓扑图的时候涉及到了 HTML5 拖放 API，了解到了 React DnD 这个拖放神器。React DnD 帮我们封装了一系列的拖放 API，大大简化了拖放 API 的使用方式。</p>\r\n\r\n![blog-bg-8](https://user-images.githubusercontent.com/15138753/72683166-de660e80-3b0f-11ea-82d5-c4ed6bc7c3b3.jpeg)\r\n\r\n## 重要概念\r\n`React Dnd` 提供了几个重要的 `API` 供我们使用：\r\n- DragSource\r\n- DropTarget\r\n- DragDropContext && DragDropContextProvider\r\n\r\n### DragSource\r\n`DragSource` 是一个高阶组件，使用 `DragSource` 高阶组件包裹的组件可以进行拖拽操作。\r\n\r\n**基本用法：**\r\n```js\r\nimport { DragSource } from 'react-dnd'\r\n\r\nclass MyComponent {\r\n  /* ... */\r\n}\r\n\r\nexport default DragSource(type, spec, collect)(MyComponent)\r\n```\r\n\r\n**参数：**\r\n- type：指定拖拽元素的类型，值的类型可以是 `string`、 `symbol` 或者 `func` ，只有具有相同type类型的元素才能被 `drop target` 所响应。 \r\n- spec: 一个js对象，上面定义了一些方法，用来描述 `drag source` 如何对拖动事件进行响应。\r\n    - beginDrag(props, monitor, component): 必填项。当拖拽开始的时候，这个方法就会被调用，这个方法必须要返回一个js 对象来描述被拖拽的元素，比如返回一个 `{ id: props.id }`,通过`monitor.getItem()` 方法可以获取到返回结果。\r\n    - endDrag(props, monitor, component): 非必填项。当拖拽停止的时候，这个方法会被调用，通过 `monitor.didDrop()` 可以判断 `drag source` 是否已经被 `drop target` 处理完毕。如果在 `drop target` 的 `drop` 方法中返回了一个对象，在这里可以通过 `monitor.getDropResult()` 获取到返回结果。\r\n    - canDrag(props, monitor): 可选参数。可以指定当前的拖拽操作是否被允许。\r\n    - isDragging(props, monitor): 可选参数。拖拽时触发的事件，注意，在这个方法里面不能再调用 `monitor.isDragging()`。\r\n    \r\n    方法中的参数解释：\r\n    - props：当前组件的 `props` 参数。\r\n    - monitor：一个 `DragSourceMonitor` 实例。通过它可以获取当前的拖拽信息，比如可以获取当前被拖拽的项目及其类型，当前和初始坐标和偏移，以及它是否已被删除。\r\n    - component：是组件的实例。使用它可以访问DOM元素来进行位置或大小测量，或调用组件里面定义的方法，或者进行 `setState` 操作。有时候在 isDragging、 canDrag 方法里可能获取不到 `component` 这个参数，因为它们被调用时实例可能不可用。\r\n\r\n- collect: 必填项，把拖拽过程中需要的信息注入组件的 `props`，接收两个参数 `connect` 和 `monitor`。\r\n  - connect: `DragSourceConnector` 的实例，包括 `dragPreview()` 和 `dragSource()` 两个方法，常用的是 `dragSource()` 这个方法。\r\n    - dragSource: 返回一个函数，传递给组件用来将 `source DOM` 和 `React DnD Backend` 连接起来。\r\n    - dragPreview: 返回一个函数，传递给组件用来将拖动时预览的 `DOM` 节点 和 `React DnD Backend` 连接起来。\r\n  - monitor: `DragSourceMonitor` 的实例，包含的具体方法可以参考[这里](https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor)。\r\n\r\n### DropTarget\r\n\r\n`DropTarget` 是一个高阶组件，被 `DropTarget` 包裹的组件能够放置拖拽组件，能够对 `hover` 或者 `dropped` 事件作出响应。\r\n\r\n**基本用法：**\r\n```js\r\nimport { DropTarget } from 'react-dnd'\r\n\r\nclass MyComponent {\r\n  /* ... */\r\n}\r\n\r\nexport default DropTarget(types, spec, collect)(MyComponent)\r\n```\r\n\r\n**参数：**\r\n- types: 指定拖拽元素的类型，值的类型可以是 `string`、 `symbol` 或者 `array` ，`drop target` 只接受具有相同 type 类型的 `drag source`。\r\n- spec: 一个js对象，上面定义了一些方法，描述了拖放目标对拖放事件的反应。\r\n    - drop(props, monitor, component): 可选参数。当item被放置到目标元素上时会被调用。如果这个方法返回的是一个js对象，在 `drag source` 的 `endDrag` 方法里面，调用 `monitor.getDropResult()` 可以获得返回结果。\r\n    - hover(props, monitor, component): 可选参数。当item经过 `drop target` 的时候被调用。可以通过 `monitor.isOver({ shallow: true })` 方法来检查悬停是仅发生在当前目标上还是嵌套上。\r\n    - canDrop(props, monitor): 可选参数。这个方法可以用来检测 `drop target` 是否接受 item。\r\n    \r\n    方法中的参数解释：\r\n    - props：当前组件的 `props` 参数。\r\n    - monitor：一个 `DropTargetMonitor` 实例。通过它可以获取当前的拖拽信息，比如可以获取当前被拖拽的项目及其类型，当前和初始坐标和偏移，以及它是否已被删除。\r\n    - component：是组件的实例。使用它可以访问DOM元素来进行位置或大小测量，或调用组件里面定义的方法，或者进行 `setState` 操作。有时候在 isDragging、 canDrag 方法里可能获取不到 `component` 这个参数，因为它们被调用时实例可能不可用。\r\n- collect: 必填项，把拖拽过程中需要的信息注入组件的 `props`，接收两个参数 `connect` 和 `monitor`。\r\n  - connect: `DropTargetConnector` 的实例，包括 `dropTarget` 一个方法。\r\n    - dropTarget: 返回一个函数，传递给组件用来将 `source DOM` 和 `React DnD Backend` 连接起来。\r\n  - monitor: `DropTargetMonitor` 的实例，包含的具体方法可以参考[这里](https://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor)。\r\n  \r\n### DragDropContext && DragDropContextProvider\r\n\r\n使用 `DragSource` 和 `DropTarget` 包裹的组件必须放置在 `DragDropContext` 或者 `DragDropContextProvider` 组件内部。\r\n\r\n**基本用法：**\r\n```js\r\nimport Backend from 'react-dnd-html5-backend'\r\nimport { DndProvider } from 'react-dnd'\r\n\r\nexport default function MyReactApp() {\r\n  return (\r\n    <DndProvider backend={Backend}>\r\n      /* your drag-and-drop application */\r\n    </DndProvider>\r\n  )\r\n}\r\n```\r\n\r\n**参数**：\r\n- backend： 必填项。HTML5 DnD API 兼容性不怎么样，并且不适用于移动端，所以干脆把 DnD 相关具体DOM事件抽离出去，单独作为一层，即 Backend，我们可以根据 React DnD提供的约定协议定义自己的 Backend。\r\n\r\n## 示例\r\n\r\n![](https://user-gold-cdn.xitu.io/2020/1/17/16fb312cf9fa172b?w=420&h=255&f=gif&s=4017972)\r\n\r\n了解了上述 API 的基本使用，现在我们就来实现下开头的demo。\r\n\r\n本示例是基于 create-react-app 开发的,通过create-react-app的CLI工具创建我们的demo工程：\r\n\r\n```bash\r\n$ create-react-app react-dnd-demo\r\n```\r\n\r\n**`src/index.js`**\r\n```js\r\nimport React from 'react'\r\nimport ReactDOM from 'react-dom'\r\nimport Container from './Container'\r\nimport { DndProvider } from 'react-dnd'\r\nimport Backend from 'react-dnd-html5-backend'\r\n\r\nfunction App() {\r\n  return (\r\n    <div className=\"App\">\r\n      <DndProvider backend={Backend}>\r\n        <Container />\r\n      </DndProvider>\r\n    </div>\r\n  )\r\n}\r\n\r\nconst rootElement = document.getElementById('root')\r\nReactDOM.render(<App />, rootElement)\r\n```\r\n**`src/Container.js`**\r\n```js\r\nimport React from 'react';\r\nimport { DropTarget } from 'react-dnd';\r\nimport DraggableBox from './DraggableBox';\r\nimport Types from './types'\r\n\r\nconst styles = {\r\n  width: '500px',\r\n  height: '300px',\r\n  position: 'relative',\r\n  border: '1px solid black',\r\n}\r\n\r\n@DropTarget(\r\n  Types.Box,\r\n  {\r\n    drop: (props, monitor, component) => {\r\n      if(!component) {\r\n        return;\r\n      }\r\n\r\n      const delta = monitor.getDifferenceFromInitialOffset();\r\n      const item = monitor.getItem();\r\n      const left = Math.round(delta.x + item.left);\r\n      const top = Math.round(delta.y + item.top);\r\n\r\n      component.moveBox(item.id, left, top);\r\n    },\r\n  },\r\n  (connect, monitor) => ({\r\n    connectDropTarget: connect.dropTarget(),\r\n    isOver: monitor.isOver(),\r\n    canDrop: monitor.canDrop(),\r\n  })\r\n)\r\nclass Container extends React.Component {\r\n  state = {\r\n    boxes: {\r\n      a: { top: 20, left: 80, title: 'Drag me around' },\r\n      b: { top: 180, left: 20, title: 'Drag me too' },\r\n    },\r\n  }\r\n\r\n  moveBox = (id, left, top) => {\r\n    const { boxes }  = this.state;\r\n    this.setState({\r\n      boxes: {\r\n        ...boxes,\r\n        [id]: {\r\n          ...boxes[id],\r\n          left,\r\n          top\r\n        }\r\n      }\r\n    })\r\n  }\r\n\r\n  render() {\r\n    const { isOver, canDrop, connectDropTarget} = this.props;\r\n    const { boxes } = this.state;\r\n    const isActive = isOver && canDrop;\r\n\r\n    let backgroundColor = '#ccc';\r\n    // 拖拽组件此时正处于 drag target 区域时，当前组件背景色变为 darkgreen\r\n    if (isActive) {\r\n      backgroundColor = '#453467';\r\n    }\r\n\r\n    console.log('qqqq', this.state.boxes)\r\n\r\n    return connectDropTarget && connectDropTarget(\r\n      <div style={{ ...styles, backgroundColor}}>\r\n        {Object.keys(boxes).map(item => <DraggableBox {...boxes[item]} id={item} />)}\r\n      </div>\r\n    )\r\n  }\r\n}\r\n\r\nexport default Container;\r\n```\r\n\r\n可以看到，在 `drop` 方法里，通过 `monitor.getDifferenceFromInitialOffset()` 方法计算出每次 `drop` 的时候，当前元素与拖拽前元素位置的偏移量，`monitor.getItem()` 方法可以获得当前 哪个元素被拖拽(必须要在 `drag source` 的 `beginDrag` 方法中返回)，调用 `component` 上的 `moveBox` 方法重新设置拖拽之后的最新位置，从而实现元素的移动。\r\n\r\n`collect` 的 `connect` 方法中通过 `monitor.isOver()` 和 `monitor.canDrop()` 方法将 `isOver` 和 `canDrop` 参数传递到组件的 `props` 中来判断当前组件是否处于拖拽状态中，这里可以用来设置拖拽时容器的背景色。\r\n\r\n这里有个细节需要注意的是，Container 容器的 `position` 属性被设置为了 `relative`,这样被拖拽的元素就会相对于该容器进行定位。\r\n\r\n**`src/DraggableBox.js`**\r\n\r\n```js\r\nimport React from 'react';\r\nimport { DragSource } from 'react-dnd';\r\nimport Box from './Box';\r\nimport Types from './types'\r\n\r\n@DragSource(\r\n  Types.Box,\r\n  {\r\n    beginDrag: (props) => {\r\n      const { id, title, left, top } = props\r\n      return { id, title, left, top }\r\n    }\r\n  },\r\n  (connect, monitor)=> ({\r\n    connectDragSource: connect.dragSource(),\r\n    isDragging: monitor.isDragging(),\r\n  })\r\n)\r\nclass DraggableBox extends React.Component {\r\n  getStyle = () => {\r\n    const { left, top } = this.props;\r\n\r\n    const transform = `translate(${left}px, ${top}px)`\r\n    return {\r\n      position: 'absolute',\r\n      transform,\r\n    }\r\n  }\r\n\r\n  render() {\r\n    const { connectDragSource } = this.props;\r\n    return connectDragSource(\r\n      <div style={this.getStyle()}><Box {...this.props}/></div>\r\n    )\r\n  }\r\n}\r\n\r\nexport default DraggableBox;\r\n```\r\n\r\n`beginDrag` 方法必须返回一个对象，以前在 drop 方法中获取到当前被拖拽组件的信息。positon 属性必须被设置为 absolute，以方便相对容器进行定位。元素的移动是通过 `css` 的 `transform` 属性进行控制的。\r\n\r\n**`src/Box.js`**\r\n```js\r\nimport React from 'react';\r\n\r\nconst styles = {\r\n  border: '1px dashed gray',\r\n  backgroundColor: 'white',\r\n  padding: '0.5rem 1rem',\r\n  marginRight: '1.5rem',\r\n  marginBottom: '1.5rem',\r\n  cursor: 'move',\r\n  display: 'inline-block'\r\n}\r\n\r\nclass Box extends React.Component {\r\n  render() {\r\n    const { title, left, right } = this.props;\r\n    return (\r\n      <div style={{...styles}}>\r\n        {title}\r\n      </div>\r\n    )\r\n  }\r\n}\r\n\r\nexport default Box;\r\n```\r\n\r\n## 总结\r\n\r\n关于 `React DnD` 的介绍，这里只是做了一个基本介绍，更多的示例大家可以参考官网，本示例的代码大家在[这里](https://github.com/astonishqft/react-dnd-demo)可以找到。\r\n\r\n\r\n![](https://user-gold-cdn.xitu.io/2020/1/19/16fbdd926c37f949?w=900&h=500&f=png&s=56137)\r\n",
      reactions: {
        url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/7/reactions",
        total_count: 1,
        "+1": 1,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/6",
      repository_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io",
      labels_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/6/labels{/name}",
      comments_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/6/comments",
      events_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/6/events",
      html_url: "https://github.com/astonishqft/astonishqft.github.io/issues/6",
      id: 548441599,
      node_id: "MDU6SXNzdWU1NDg0NDE1OTk=",
      number: 6,
      title: "redux之compose的理解",
      user: {
        login: "astonishqft",
        id: 15138753,
        node_id: "MDQ6VXNlcjE1MTM4NzUz",
        avatar_url: "https://avatars2.githubusercontent.com/u/15138753?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/astonishqft",
        html_url: "https://github.com/astonishqft",
        followers_url: "https://api.github.com/users/astonishqft/followers",
        following_url: "https://api.github.com/users/astonishqft/following{/other_user}",
        gists_url: "https://api.github.com/users/astonishqft/gists{/gist_id}",
        starred_url: "https://api.github.com/users/astonishqft/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/astonishqft/subscriptions",
        organizations_url: "https://api.github.com/users/astonishqft/orgs",
        repos_url: "https://api.github.com/users/astonishqft/repos",
        events_url: "https://api.github.com/users/astonishqft/events{/privacy}",
        received_events_url: "https://api.github.com/users/astonishqft/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 1707699242,
          node_id: "MDU6TGFiZWwxNzA3Njk5MjQy",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/javascript",
          name: "javascript",
          color: "006b75",
          default: false,
          description: "",
        },
        {
          id: 1747782289,
          node_id: "MDU6TGFiZWwxNzQ3NzgyMjg5",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/%E5%89%8D%E7%AB%AF",
          name: "前端",
          color: "8246ea",
          default: false,
          description: "",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 1,
      created_at: "2020-01-11T15:18:02Z",
      updated_at: "2020-03-18T15:53:16Z",
      closed_at: null,
      author_association: "OWNER",
      body:
        "<p>compose 是redux中提供的一个高级函数，理解compose函数对于我们理解函数式编程是大有裨益的。</p>\r\n\r\n![blog_bg6](https://user-images.githubusercontent.com/15138753/72206452-15617200-34c9-11ea-9991-6dbbeb431e13.jpeg)\r\n\r\n### 应用\r\n\r\n最近给自己的 `react` 项目添加 `redux` 的时候，用到了 `redux` 中的 `compose` 函数，使用 `compose` 来增强 `store`，下面是我在项目中的一个应用:\r\n```javascript\r\nimport {createStore,applyMiddleware,compose} from 'redux';\r\nimport createSagaMiddleware from 'redux-saga';\r\nconst sagaMiddleware = createSagaMiddleware();\r\nconst middlewares = [];\r\n\r\nlet storeEnhancers = compose(\r\n    applyMiddleware(...middlewares,sagaMiddleware),\r\n    (window && window .devToolsExtension) ? window .devToolsExtension() : (f) => f,\r\n);\r\n\r\nconst store = createStore(rootReducer, initialState={} ,storeEnhancers);\r\n```\r\n上面这段代码可以让 `store` 与 `applyMiddleware ` 和 `devToolsExtension ` 一起使用。\r\n\r\n### reduce方法\r\n在理解 `compose` 函数之前先来认识下什么是 `reduce` 方法？\r\n[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)上是这么定义 `reduce` 方法的：\r\n\r\n> `reduce()` 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其简化为单个值。\r\n\r\n看下函数签名：\r\n\r\n```javascript\r\narr.reduce(callback[, initialValue])\r\n```\r\n**`callback`**\r\n执行数组中每个值的函数，包含四个参数：\r\n - `accumulator` (**累加器**)\r\n\t累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`。\r\n - `currentValue` (**当前值**)\r\n    数组中正在处理的元素。\r\n - `currentIndex` 可选（**当前索引**）\r\n\t数组中正在处理的当前元素的索引。 如果提供了 initialValue，则索引号为0，否则为索引为1。\r\n - `array` 可选（**数组**）\r\n调用reduce()的数组\r\n - `initialValue` 可选（**初始值**）\r\n\t用作第一个调用 `callback` 的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初\t始值的空数组上调用 `reduce` 将报错。\r\n\r\n下面看一个简单的🌰:\r\n\r\n数组求和\r\n```javascript\r\nvar sum = [0, 1, 2, 3].reduce(function (a, b) {\r\n  return a + b;\r\n}, 0);\r\n// sum 值为 6\r\n```\r\n这个例子比较简单，下面再看个稍微复杂点的例子，计算数组中每个元素出现的次数：\r\n```javascript\r\nvar series = ['a1', 'a3', 'a1', 'a5',  'a7', 'a1', 'a3', 'a4', 'a2', 'a1'];\r\n\r\nvar result= series.reduce(function (accumulator, current) {\r\n    if (current in accumulator) {\r\n        accumulator[current]++;\r\n    }\r\n    else {\r\n        accumulator[current] = 1;\r\n    }\r\n    return accumulator;\r\n}, {});\r\n\r\nconsole.log(JSON.stringify(result));\r\n// {\"a1\":4,\"a3\":2,\"a5\":1,\"a7\":1,\"a4\":1,\"a2\":1}\r\n```\r\n这个例子很巧妙的利用了数组的 `reduce` 方法，在很多算法面试题中也经常用到。这里需要注意的是需要指定 `initialValue` 参数。\r\n\r\n通过 `reduce` 函数还可以实现数组去重：\r\n```javascript\r\nvar a = [1, 1, 2, 3, 4, 4, 5, 6, 6, 6, 7];\r\nArray.prototype.duplicate = function() {\r\n\treturn this.reduce(function(cal, cur) {\r\n\t\tif(cal.indexOf(cur) === -1) {\r\n\t\t\tcal.push(cur);\r\n\t\t}\r\n\t\treturn cal;\r\n\t}, [])\r\n}\r\n\r\nvar newArr = a.duplicate();\r\n```\r\n\r\n### compose函数\r\n理解完了数组的 `reduce` 方法之后，就很容易理解 `compose` 函数了，因为实际上 `compose` 就是借助于 `reduce` 来实现的。看下[官方源码](https://github.com/reduxjs/redux/blob/v3.7.2/src/compose.js)：\r\n\r\n```javascript\r\nexport default function compose(...funcs) {\r\n  if (funcs.length === 0) {\r\n    return arg => arg\r\n  }\r\n\r\n  if (funcs.length === 1) {\r\n    return funcs[0]\r\n  }\r\n\r\n  return funcs.reduce((a, b) => (...args) => a(b(...args)))\r\n}\r\n```\r\n`compose` 的返回值还是一个函数，调用这个函数所传递的参数将会作为 `compose` 最后一个参数的参数，从而像\"洋葱圈\"似的，由内向外，逐步调用。\r\n\r\n看下面的例子：\r\n```javascript\r\nimport { compose } 'redux'；\r\n\r\n// function f\r\nconst f = (arg) => `函数f(${arg})` \r\n\r\n// function g\r\nconst g = (arg) => `函数g(${arg})`\r\n\r\n// function h 最后一个函数可以接受多个参数\r\nconst h = (...arg) => `函数h(${arg.join('_')})`\r\n\r\nconsole.log(compose(f,g,h)('a', 'b', 'c')) //函数f(函数g(函数h(a_b_c)))\r\n```\r\n\r\n所以最后返回的就是这样的一个函数 `compose(fn1, fn2, fn3) (...args) = > fn1(fn2(fn3(...args)))`。\r\n\r\n\r\n\r\n",
      reactions: {
        url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/6/reactions",
        total_count: 1,
        "+1": 1,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/5",
      repository_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io",
      labels_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/5/labels{/name}",
      comments_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/5/comments",
      events_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/5/events",
      html_url: "https://github.com/astonishqft/astonishqft.github.io/issues/5",
      id: 545643012,
      node_id: "MDU6SXNzdWU1NDU2NDMwMTI=",
      number: 5,
      title: "手摸手教你撸一个代码检测命令行工具(CLI)",
      user: {
        login: "astonishqft",
        id: 15138753,
        node_id: "MDQ6VXNlcjE1MTM4NzUz",
        avatar_url: "https://avatars2.githubusercontent.com/u/15138753?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/astonishqft",
        html_url: "https://github.com/astonishqft",
        followers_url: "https://api.github.com/users/astonishqft/followers",
        following_url: "https://api.github.com/users/astonishqft/following{/other_user}",
        gists_url: "https://api.github.com/users/astonishqft/gists{/gist_id}",
        starred_url: "https://api.github.com/users/astonishqft/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/astonishqft/subscriptions",
        organizations_url: "https://api.github.com/users/astonishqft/orgs",
        repos_url: "https://api.github.com/users/astonishqft/repos",
        events_url: "https://api.github.com/users/astonishqft/events{/privacy}",
        received_events_url: "https://api.github.com/users/astonishqft/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 1770898821,
          node_id: "MDU6TGFiZWwxNzcwODk4ODIx",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/eslint",
          name: "eslint",
          color: "a1c631",
          default: false,
          description: "",
        },
        {
          id: 1747782289,
          node_id: "MDU6TGFiZWwxNzQ3NzgyMjg5",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/%E5%89%8D%E7%AB%AF",
          name: "前端",
          color: "8246ea",
          default: false,
          description: "",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 0,
      created_at: "2020-01-06T10:04:35Z",
      updated_at: "2020-01-06T10:49:00Z",
      closed_at: null,
      author_association: "OWNER",
      body:
        "<p>big-lint 是一个集成了 eslint、prettier、lint-staged、husky 等工具实现代码的检测工具。提供一个命令行工具来封装检测工具，帮助我们简化配置步骤。</p>\r\n\r\n![bg-6](https://user-images.githubusercontent.com/15138753/71811075-c96c9280-30ae-11ea-8805-1e38ed251c9e.jpeg)\r\n\r\n## 🚗如何开发一个命令行工具\r\n\r\n首先大家要明白什么是命令行工具，命令行工具英文名叫 `command-line interface`，缩写，**`CLI`**，（下面都简称CLI）`CLI`可以让用户实时的与系统进行交互，获取系统的实时信息，完成用户自定义的功能。比如 `git`、`create-react-app`、`vue-cli` 等都是大家平时接触的比较多的命令行工具。\r\n\r\n那么回到标题，如何开发一个命令行工具呢？\r\n\r\n### oclif\r\n\r\n#### 简介\r\n这里我采用了[oclif](https://oclif.io/docs/introduction),一款可以帮我们快速构建 `CLI` 的框架，并且可以支持 `Javascript` 或者 `Typescript`语言。\r\n\r\n`oclif` 提供了两种类型的命令行工具，`Single-command` 和 `Multi-command`。`Single-command` 比如 `ls` 或者 `curl` 命令，`Multi-command` 比如 `git`, 可以提供多个命令，类似于 `git add`、 `git commit`等。这里根据需要，选择了 `Single-command`。\r\n\r\n#### 快速创建\r\n\r\n运行如下命令行可以快速创建一个 `Single-command` 命令行：\r\n\r\n```bash\r\n$ npx oclif single big-lint\r\n```\r\n然后根据命令行的提示，输入一些基本信息，就可以直接帮我们创建好一个 `CLI` 工程。\r\n\r\n![](https://user-gold-cdn.xitu.io/2020/1/4/16f6c382074086f6?w=980&h=730&f=png&s=705507)\r\n\r\n\r\n执行如下命令输入如下信息，表示一个 `CLI` 就创建成功了。这里我选择了使用  `Typescript` 来创建 `CLI`，毕竟都2020年了，再不会 `Typescript`有点说不过去了😅。\r\n\r\n```bash\r\n$ cd big-lint\r\n$ ./bin/run\r\nhello world from ./src/index.js!\r\n$ ./bin/run --help\r\nDescribe the command here\r\n\r\ndescribe the command here\r\n\r\nUSAGE\r\n  $ big-lint [FILE]\r\n\r\nOPTIONS\r\n  -f, --force\r\n  -h, --help       show CLI help\r\n  -n, --name=name  name to print\r\n  -v, --version    show CLI version\r\n```\r\n\r\n**tips：这里需要注意的是，在给你的 `CLI` 起名字的时候，可以执行 `npm view packageName`来查看名字是否已经被别人占用，因为我们开发好的 `CLI` 工具最终是会发布到 `npm` 上的，如果名字被占用了是无法发布的，到时候再改起来比较麻烦。**\r\n\r\n此时打开 `package.json` 文件，可以看到其中的 `main` 字段：\r\n```json\r\n{\r\n    \"main\": \"src/index.js\",\r\n}\r\n```\r\n`main` 字段指定的是一个入口文件，就是我们执行 `$ ./bin/run` 命令的时候执行的文件。\r\n\r\n**`src/index.js`**\r\n```js\r\nimport {Command, flags} from '@oclif/command'\r\n\r\nclass HappyLint extends Command {\r\n  static description = 'describe the command here'\r\n\r\n  static flags = {\r\n    // add --version flag to show CLI version\r\n    version: flags.version({char: 'v'}),\r\n    help: flags.help({char: 'h'}),\r\n    // flag with a value (-n, --name=VALUE)\r\n    name: flags.string({char: 'n', description: 'name to print'}),\r\n    // flag with no value (-f, --force)\r\n    force: flags.boolean({char: 'f'}),\r\n  }\r\n\r\n  static args = [{name: 'file'}]\r\n\r\n  async run() {\r\n    const {args, flags} = this.parse(HappyLint)\r\n\r\n    const name = flags.name || 'world'\r\n    this.log(`hello ${name} from ./src/index.ts`)\r\n    if (args.file && flags.force) {\r\n      this.log(`you input --force and --file: ${args.file}`)\r\n    }\r\n  }\r\n}\r\n\r\nexport = HappyLint\r\n```\r\n\r\n如果想用 `$ big-lint` 代替 `$ ./bin/run` 命令，可以在工程目录下执行 `$ npm link` 命令，接下来你就可以愉快的使用 `$ big-lint --help` 查看效果了。\r\n\r\n到这里，一个简单的 `CLI` 工具就完成了，接下来开始我们的正题，如何实现代码检测。\r\n\r\n## 🚀如何实现代码检测和代码美化\r\n\r\n### 检测工具\r\n为了保证每次提交到 `git` 仓库代码的规范性，前端的解决方案一般会使用 `eslint`、`prettier`、`lint-staged` 配合 `git hook` 和 `husky`, 在 `git commit` 的时候就对代码进行 `eslint` 规范校验。接着需要安装上述依赖包，然后在 `package.json` 文件中进行配置：\r\n\r\n```json\r\n{\r\n  \"lint-staged\": {\r\n    \"src/**/*.js\": [\r\n      \"eslint --fix --ext .js\",\r\n      \"prettier --write\",\r\n      \"git add\"\r\n    ]\r\n  },\r\n  \"husky\": {\r\n    \"hooks\": {\r\n      \"pre-commit\": \"lint-staged\"\r\n    }\r\n  },\r\n}\r\n```\r\n\r\n`big-lint` 存在的意义就是要简化这样一个过程，省略繁杂的配置。\r\n\r\n### 构建自己的CLI\r\n\r\n#### 安装依赖\r\n现在 `cd` 到我们之前创建的 `big-lint` 工程中，在根目录下执行如下命令,安装相应的包：\r\n`$ yarn add husky eslint prettier lint-staged eslint-config-airbnb eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-config-prettier eslint-formatter-pretty eslint-plugin-babel eslint-plugin-compat eslint-plugin-eslint-comments eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-unicorn -S`\r\n\r\n#### 大致思路\r\n\r\n`big-lint` 将提供两种检测模式：\r\n- **对提交的代码进行检测**\r\n- **通过指定 dir 参数，对指定路径下的代码进行检测**\r\n\r\n参数说明：\r\n```bash\r\nbig-lint [options] [dir]\r\n\r\nArguments:\r\ndir                       指定校验的路径（支持node的glob语法）                     [string]\r\n\r\nFlags:\r\n--staged, -S              only lint git staged files                          [boolean] [default: false]\r\n--prettier, -p            format code with prettier                           [boolean] [default: false]\r\n--eslint, -e              enable lint javascript                              [boolean] [default: false]\r\n--fix, -f                 fix all eslint and stylelint auto-fixable problems  [boolean] [default: false]\r\n--format, -F              output format of console                            [string]  [default: stylish]\r\n--cwd, -c                 current working directory                           [default: process.cwd()]\r\n```\r\n\r\n#### 对提交的代码进行检测\r\n通过 `--staged` 参数，来判断当前是否只对提交的代码进行检测，实现方式就是借助于 `lint-staged`、`husky`、`eslint`。下面用代码来实现：\r\n\r\n定义 **`OPTIONS`**\r\n\r\n**`src/utils/options.ts`**\r\n```js\r\nimport {flags} from '@oclif/command'\r\n\r\nconst flagConfig = {\r\n  staged: flags.boolean({\r\n    char: 'S',\r\n    default: false,\r\n    description: 'only lint git staged files',\r\n  }),\r\n  prettier: flags.boolean({\r\n    char: 'P',\r\n    default: false,\r\n    description: 'format code with prettier',\r\n  }),\r\n  eslint: flags.boolean({\r\n    char: 'e',\r\n    default: false,\r\n    description: 'enabel lint javascript',\r\n  }),\r\n  fix: flags.boolean({\r\n    char: 'f',\r\n    default: false,\r\n    description: 'fix all eslint and stylelint auto-fixable problems',\r\n  }),\r\n  cwd: flags.string({\r\n    char: 'c',\r\n    default: process.cwd(),\r\n    description: 'current working directory',\r\n  }),\r\n  format: flags.string({\r\n    char: 'F',\r\n    default: 'stylish',\r\n    description: 'output format of console',\r\n  }),\r\n}\r\n\r\nexport default flagConfig\r\n```\r\n控制台行执行：\r\n```bash\r\n$ big-lint --help\r\n```\r\n可以看到如下信息，说明我们设置的 `flags` 生效了：\r\n```bash\r\n检测js(eslint)\r\n\r\nUSAGE\r\n  $ big-lint [DIR]\r\n\r\nARGUMENTS\r\n  DIR  指定路径\r\n\r\nOPTIONS\r\n  -F, --format=format  [default: stylish] output format of console\r\n  -P, --prettier       format code with prettier\r\n  -S, --staged         only lint git staged files\r\n  -c, --cwd=cwd        [default: /Users/Documents/big-lint] current working directory\r\n  -e, --eslint         enabel lint javascript\r\n  -f, --fix            fix all eslint and stylelint auto-fixable problems\r\n```\r\n\r\n修改 **`src/index.js`** 下的 `run` 方法，根据  `staged` 参数来判断是走哪段逻辑。\r\n\r\n```js\r\nasync run() {\r\n  const {args, flags} = this.parse(HappyLint)\r\n  const {staged, ...rest} = flags\r\n  const {dir} = args\r\n\r\n  if (staged) {\r\n    await this.lintStaged(rest)\r\n  } else {\r\n    await this.lint({...rest, dir})\r\n  }\r\n}\r\n```\r\n\r\n先看下 `lintStaged` 的代码：\r\n\r\n```js\r\nasync lintStaged(flags: any) {\r\n  const {prettier, eslint, fix, format} = flags\r\n  getEslintConfig()\r\n\r\n  let eslintCommon = fix ? `${eslintPath} --fix` : eslintPath\r\n\r\n  // 增加格式化输出\r\n  if (format !== 'stylish') {\r\n    eslintCommon = `${eslintCommon} -f ${format}`\r\n  }\r\n\r\n  const lintstagedrc = {\r\n    ...(prettier && {\r\n      '*.{js,jsx,ts,tsx,less,scss,sass,css}': [\r\n          `${prettierPath} --write`,\r\n          'git add',\r\n        ],\r\n    }),\r\n    ...(eslint && {\r\n        '*{.js,.jsx,.ts,.tsx}': [\r\n          eslintCommon,\r\n          'git add',\r\n        ],\r\n       }),\r\n    }\r\n    const rcPath = join(__dirname, '.lintstagedrc.json')\r\n    writeFileSync(rcPath, JSON.stringify(lintstagedrc))\r\n\r\n    try {\r\n      const child = spawn(lintStagedPath, ['-c', rcPath], {stdio: 'inherit'})\r\n      child.on('close', (code: any) => {\r\n        process.exit(code) // eslint-disable-line\r\n      })\r\n    } catch (error) {\r\n\r\n    }\r\n}\r\n```\r\n`getEslintConfig` 方法会先判断在工程根路径下是否存在默认 `.eslintrc.js`、 `.prettierrc` 、`.editorconfig` 配置文件，如果没有的话默认会自动生成一份配置文件置于工程根目录下。\r\n\r\n这里使用了 `cross-spawn` 来调用工程根路径下的 `node_modules/.bin/lint-staged` 执行命令， `spawn` 的第二个参数是一个数组，传入执行命令的参数, `-c` 参数指定了 `lint-staged` 命令的 配置文件路径。\r\n\r\n`spawn` 函数的返回一个子进程，当子进程的 `stdio` 流已被关闭时会触发 `close` 事件,我们需要监听下这个事件，因为 `lint-staged` 检验不通过活，我们需要执行 `process.exite(code)` 方法将进程杀掉。\r\n\r\n到这里， `lintStaged` 的逻辑就走完了，现在可以测试下效果了。\r\n\r\n找一个测试工程，在 `package.json` 文件中进行如下配置：\r\n\r\n```json\r\n{\r\n    \"husky\": {\r\n        \"hooks\": {\r\n          \"pre-commit\": \"big-lint --eslint --staged\"\r\n        }\r\n    },\r\n}\r\n```\r\n在该工程下加入 `.eslintrc.js` 配置文件，执行 `$ git add`, `$ git commit -m 'test'`,如果存在 `eslint` 报错，可以看到以下错误信息。\r\n\r\n\r\n![](https://user-gold-cdn.xitu.io/2020/1/6/16f79fae9cb37921?w=1007&h=310&f=png&s=245458)\r\n\r\n接下来再看下 `lint` 的代码：\r\n```js\r\nasync lint(flags: any) {\r\n    const {dir, cwd, prettier, eslint, fix, format} = flags\r\n    if (dir === undefined) {\r\n      this.error('please specify a path to lint')\r\n    }\r\n    // 支持多路径，以逗号分隔\r\n    let filePath: any\r\n\r\n    if (dir.split(',').length !== 0) {\r\n      filePath = dir.split(',')\r\n    } else {\r\n      filePath = dir\r\n    }\r\n\r\n    const allFiles = getFiles(filePath, cwd)\r\n    try {\r\n      if (eslint) {\r\n        getEslintConfig()\r\n        const eslintExtensions = ['.js', '.jsx', '.ts', '.tsx']\r\n        const files = allFiles.filter(item => endsWithArray(item, eslintExtensions))\r\n        if (files.length > 0) {\r\n          let args = fix ? ['--fix', ...files] : [...files]\r\n          args = format !== 'stylish' ? ['-f', format, ...args] : [...args]\r\n          spawn.sync(eslintPath, args, {stdio: 'inherit'})\r\n        }\r\n      }\r\n\r\n      if (prettier) {\r\n        const prettierExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.scss', '.sass']\r\n        const files = allFiles.filter(item =>\r\n          endsWithArray(item, prettierExtensions),\r\n        )\r\n        if (files.length > 0) {\r\n          spawn.sync(prettierPath, ['--write', ...files], {stdio: 'inherit'})\r\n        }\r\n      }\r\n    } catch (error) {\r\n      this.error(error)\r\n    }\r\n  }\r\n```\r\n\r\n通过 `getFiles` 方法获取指定路径下除去 `node_modules` 下的所有 js文件，对其进行代码校验。\r\n\r\n**`src/utils/utils.ts`**\r\n```js\r\nexport const getFiles = (patterns: any, cwd: any) => {\r\n  const result = globby\r\n  .sync(patterns, {\r\n    gitignore: true,\r\n    ignore: ['**/node_modules/**', '.git'],\r\n    onlyFiles: true,\r\n    dot: true,\r\n  })\r\n  .map((item: any) => {\r\n    // ignore 包必须使用相对路径\r\n    return path.relative(cwd, item)\r\n  })\r\n\r\n  return ignore()\r\n  .add(getIgnores(cwd))\r\n  .filter(result)\r\n}\r\n```\r\n\r\n在测试工程里面的 `pacakge.json` 文件里进行如下配置：\r\n```json\r\n{\r\n    \"scripts\": {\r\n        \"lint\": \"big-lint --eslint 'src/'\",\r\n        \"prettier\": \"big-lint --prettier 'src/'\",\r\n        \"fix\": \"big-lintpy-lint --eslint --fix 'src/'\"\r\n      },\r\n}\r\n```\r\n执行 `$ npm run lint` 命令，可以对`src` 目录下代码进行 `eslint` 规则校验，执行 `npm run prettier` 可以对 `src` 目录下的代码进行 `prettier` 代码美化， 执行 `$ npm run fix` 可以对 `src` 目录下的代码进行自动代码修复。\r\n\r\n### 发布自己的CLI工具\r\n\r\n要发布自己的 `npm` 包，首先要去 `npm` 官网上注册一个`npm`的账号，进入到 `CLI` 目录中，执行 `$ npm login`, 填写好登录信息。\r\n\r\n修改 `package.json` 文件中的 `keywords` 字段，这里需要填写你要发布的 `npm` 包关键字信息，如果你想让你的 `npm` 包被更多人搜索使用的话，`keywords` 字段需要尽量描述精确。\r\n\r\n`name` 字段和 `version` 字段是必填字段，`name` 要唯一，不能是别人已经使用过的，`homepage` 字段是你的 `npm` 包的主页，因为我的 `npm` 包是开源的，所以这里就填写了 `github` 地址。\r\n\r\n以上信息确认无误后，执行 `$ npm run prepack` 命令， 再执行 `npm publish` 命令就可以完成 `npm` 包的发布了。\r\n\r\n[github地址](https://github.com/astonishqft/big-lint/)\r\n\r\n",
      reactions: {
        url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/5/reactions",
        total_count: 1,
        "+1": 1,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/4",
      repository_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io",
      labels_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/4/labels{/name}",
      comments_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/4/comments",
      events_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/4/events",
      html_url: "https://github.com/astonishqft/astonishqft.github.io/issues/4",
      id: 541346090,
      node_id: "MDU6SXNzdWU1NDEzNDYwOTA=",
      number: 4,
      title: "基于Github issues + umi 搭建一个免费的带评论功能的博客(二)",
      user: {
        login: "astonishqft",
        id: 15138753,
        node_id: "MDQ6VXNlcjE1MTM4NzUz",
        avatar_url: "https://avatars2.githubusercontent.com/u/15138753?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/astonishqft",
        html_url: "https://github.com/astonishqft",
        followers_url: "https://api.github.com/users/astonishqft/followers",
        following_url: "https://api.github.com/users/astonishqft/following{/other_user}",
        gists_url: "https://api.github.com/users/astonishqft/gists{/gist_id}",
        starred_url: "https://api.github.com/users/astonishqft/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/astonishqft/subscriptions",
        organizations_url: "https://api.github.com/users/astonishqft/orgs",
        repos_url: "https://api.github.com/users/astonishqft/repos",
        events_url: "https://api.github.com/users/astonishqft/events{/privacy}",
        received_events_url: "https://api.github.com/users/astonishqft/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 1747782053,
          node_id: "MDU6TGFiZWwxNzQ3NzgyMDUz",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/umi",
          name: "umi",
          color: "8e0f40",
          default: false,
          description: "",
        },
        {
          id: 1747782289,
          node_id: "MDU6TGFiZWwxNzQ3NzgyMjg5",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/%E5%89%8D%E7%AB%AF",
          name: "前端",
          color: "8246ea",
          default: false,
          description: "",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 0,
      created_at: "2019-12-21T16:43:47Z",
      updated_at: "2019-12-22T08:14:29Z",
      closed_at: null,
      author_association: "OWNER",
      body:
        '<p>上一篇文章我主要介绍了什么是Github App，以及如何利用GitHub App为我们的repository进行授权，解决了博客的数据存储和获取，那么这篇文章我将着重介绍博客搭建过程中用到的前端技术。</p>\r\n\r\n![0b33578dd7646330cf13f9060deeb783](https://user-images.githubusercontent.com/15138753/71319046-c466eb00-24d3-11ea-9720-b0ea0e968495.png)\r\n\r\n## 🚗为什么是Umi\r\n用过`React`的同学应该很多人都知道`Umi`(乌米)这个框架，没听过的那么我也建议大家有时间可以去了解下它[传送门](https://umijs.org/zh/guide/)。\r\n\r\n`Umi`内置了`react`、`preact`、`webpack`、`react-router`、`babel` 等，可以做到开箱即用，它独特的约定式路由可以帮我们省去路由配置的步骤。所以使用Umi脚手架新建的工程，目录结构式非常清晰明了的。下面看下一个`Umi`创建的工程的目录结构：\r\n```\r\n.\r\n├── dist/                          // 默认的 build 输出目录\r\n├── mock/                          // mock 文件所在目录，基于 express\r\n├── config/\r\n    ├── config.js                  // umi 配置，同 .umirc.js，二选一\r\n└── src/                           // 源码目录，可选\r\n    ├── layouts/index.js           // 全局布局\r\n    ├── pages/                     // 页面目录，里面的文件即路由\r\n        ├── .umi/                  // dev 临时目录，需添加到 .gitignore\r\n        ├── .umi-production/       // build 临时目录，会自动删除\r\n        ├── document.ejs           // HTML 模板\r\n        ├── 404.js                 // 404 页面\r\n        ├── page1.js               // 页面 1，任意命名，导出 react 组件\r\n        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件\r\n        └── page2.js               // 页面 2，任意命名\r\n    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less\r\n    ├── global.js                  // 可以在这里加入 polyfill\r\n    ├── app.js                     // 运行时配置文件\r\n├── .umirc.js                      // umi 配置，同 config/config.js，二选一\r\n├── .env                           // 环境变量\r\n└── package.json\r\n```\r\n# 🚢 markdown\r\n`github issues`是支持`markdown`格式的，因此我们博客文章的展示必须是要支持`markdown`格式，这里我选择了`react-markdown`。\r\n\r\n## react-markdown的使用\r\n首先需要安装：\r\n```bash\r\nnpm i react-markdown\r\n```\r\n`react-markdown`默认是不支持代码语法高亮提示的，因此，还需要安装`react-syntax-highlighter`这个库：\r\n```bash\r\nnpm i react-syntax-highlighter\r\n```\r\n因为我们的博客是基于`Github`的`markdown`来书写的，因此和`react-markdown`自带的`markdown`样式还是有些差距的，这里我还引入了`github-markdown-css`这个库来解决样式渲染的问题。\r\n\r\n为了使用的方便，封装了一个`markdown`组件：\r\n```js\r\n// index.js\r\nimport ReactMarkdown from \'react-markdown\';\r\nimport CodeBlock from \'@/components/markdown/codeBlock\';\r\nimport \'github-markdown-css\';\r\nimport \'./index.less\';\r\n\r\nexport default (props) => {\r\n  const { dataSource } = props;\r\n  return (\r\n    <ReactMarkdown\r\n      escapeHtml={false}\r\n      renderers={{\r\n        code: CodeBlock,\r\n      }}\r\n      className="markdown-body"\r\n      source={dataSource}\r\n    />\r\n  )\r\n}\r\n```\r\n\r\n代码高亮：\r\n```js\r\n// codeBlock.js\r\nimport React, { PureComponent } from "react";\r\nimport PropTypes from "prop-types";\r\nimport { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";\r\n// 设置高亮样式\r\nimport { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";\r\n// 设置高亮的语言\r\nimport { jsx, javascript, sass, scss, less, css } from "react-syntax-highlighter/dist/esm/languages/prism";\r\n\r\nclass CodeBlock extends PureComponent {\r\n  static propTypes = {\r\n    value: PropTypes.string.isRequired,\r\n    language: PropTypes.string\r\n  };\r\n\r\n  static defaultProps = {\r\n    language: null\r\n  };\r\n\r\n  componentDidMount() {\r\n    // 注册要高亮的语法，\r\n    // 注意：如果不设置打包后供第三方使用是不起作用的\r\n    SyntaxHighlighter.registerLanguage("jsx", jsx);\r\n    SyntaxHighlighter.registerLanguage("javascript", javascript);\r\n    SyntaxHighlighter.registerLanguage("sass", sass);\r\n    SyntaxHighlighter.registerLanguage("scss", scss);\r\n    SyntaxHighlighter.registerLanguage("less", less);\r\n    SyntaxHighlighter.registerLanguage("css", css);\r\n  }\r\n\r\n  render() {\r\n    const { language, value } = this.props;\r\n    return (\r\n      <figure className="highlight">\r\n        <SyntaxHighlighter language={language} style={solarizedlight}>\r\n          {value}\r\n        </SyntaxHighlighter>\r\n      </figure>\r\n    );\r\n  }\r\n}\r\n\r\nexport default CodeBlock;\r\n```\r\n关于代码高亮显示需要注意的是，我们必须要使用**registerLanguage**方法来注册你想要高亮显示的语言，同时`react-syntax-highlighter`提供了若干种代码高亮的样式供我们使用，在**react-syntax-highlighter/dist/esm/styles/prism**目录下可以选择你喜欢的代码高亮样式，这里我选择了`solarizedlight`这款样式。\r\n\r\n## 🦁️关于路由方式的选择\r\n我们知道，`react`有三种路由方式：`history路由`， `hash路由`和`memory路由`，常用的是前两种方式，我们的博客最终是要发布并部署到到`github page`上面的，如果选择`history路由`，那么部署上线后，在非根路径下刷新页面会报404错误。\r\n\r\n单页应用一般是需要在服务端设置将所有的页面都重定向到`index.html`的，比如我们刷新http:xxx.com/list页面，服务器会去在根路径的list目录下去查找资源文件，这个文件服务器上显然是不存在的，这个时候就会返回`404`。\r\n\r\n遇到这个问题我们一般会选择在`nginx`上进行如下配置：\r\n```\r\nlocation /{\r\n     root   /data/nginx/html;\r\n     index  index.html index.htm;\r\n     error_page 404 /index.html;\r\n}\r\n```\r\n也就是说找不到对应资源的时候会自动重定向到`index.html`。\r\n\r\n但是很显然，在\t`github page`上我们是无法这么操作的，因此这里我们就偷个懒，选择了`hash`路由。\r\n\r\n在`umi`上设置路由方式是很方便的，直接在根目录下的`.umirc.js`文件中进行如下配置即可：\r\n```js\r\nexport default {\r\n  history: \'hash\',\r\n}\r\n```\r\n\r\n## 🌻关于前端跨域问题\r\n前面我们说到，当我们在进行权限认证的时候，根据授权码向`https://github.com/login/oauth/access_token`这个地址进行请求，获取Token的时候，会存在跨域问题。那么有什么好的方式可以解决这个问题呢？\r\n\r\n跨域产生的原因我就不阐述了，不清楚的同学可以去Google一下，这里我为了解决跨域问题，采用了cors方式，也就是对请求返回的header加上允许跨域操作的请求头。\r\n\r\n思路大概是，认证的时候，向一个第三方代理接口发送认证请求，这个第三方代理接口再向github服务器发送真正的认证请求，这个第三方代理接口我们可以设置允许跨域的的headers。\r\n\r\n#### 关于zeito.co\r\n那么现在的问题就很简单了，提供一个第三方认证的代理接口就可以解决我们的问题，为了践行文章的标题“免费”二字，专门为了这个接口去租一个服务器提供认证接口显然是得不偿失的，这里我向大家推荐[zeit.co](https://zeit.co/docs)这个网站，他允许我们免费部署一个静态网站或者Serverless Functions。官网是这么介绍的：\r\n\r\n> ZEIT Now is a cloud platform for static sites and Serverless Functions. It enables developers to host websites and web services that deploy instantly, scale automatically, and requires no supervision, all with no configuration.\r\n\r\n这里我们就是利用zeit.co提供的Serverless Functions功能，实现一个第三方的代理接口。\r\n\r\nzeit.co提供了两种方式部署自己的服务。\r\n\r\n- 第一种方式是使用Now Cli工具来部署：\r\n\r\n1. 首先需要安装now cli工具。\r\n```bash\r\nnpm i -g now\r\n```\r\n2. 然后登录now\r\n```bash\r\nnow login\r\n```\r\n3. 创建自己的工程\r\n这里可以根据自己的需要使用模版来创建自己的工程，或者直接使用已有的工程。\r\n```bash\r\nnpm init next-app my-next-project\r\n```\r\n4, 发布自己的工程到zeit.co\r\n```bash\r\nnow\r\n```\r\n这种方式简单、易用，但是也存在一个弊端，就是在第二步的时候可能受制于网络问题，出现无法登录的情况，当然如果你有梯子，这都不是事。如果你没有梯子，没关系，下面我介绍第二种方式来部署你的应用。\r\n\r\n- 使用GitHub部署你的应用\r\n借助于Github也可以方便的部署你的应用，并且这种方式我觉得值得推荐，他有下面几个优点：\r\n> 1. Deploys every push in branches and pull requests to preview changes live\r\n> 2. Updates production domains with the most recent changes from the master branch\r\n> 3. Instant rollbacks for production domains when reverting changes\r\n\r\n简单说就是每次在Github上面提交了代码，都会触发自动部署功能，并且会自动更新部署之后的域名。\r\n\r\n我采用的是第二种方式来部署我的应用。下面介绍下具体的过程。\r\n\r\n首先需要在zeito.co上注册一个账号，然后关联上你的Github账号，然后进入dashboard页面，这里就可以创建自己的应用，并且选择From Github中已存在的工程进行创建。\r\n![在这里插入图片描述](https://img-blog.csdnimg.cn/20191221232851820.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FzdG9uaXNocWZ0,size_16,color_FFFFFF,t_70)\r\n#### 创建一个Serverless Functions\r\n在根目录的api目录下创建一个date.js文件，比如：\r\n```js\r\n// date.js\r\nmodule.exports = (req, res) => {\r\n  const date = new Date().toString();\r\n  res.status(200).send(date);\r\n};\r\n```\r\n当我们访问`/api/date`,接口就会返回当前的系统时间，也就是说，我们无需指定路由文件，每个文件就是一个独立的路由，这点有点类似于umi的约定式路由。\r\n\r\n介绍完上面的Serverless Functions，现在回到我们的需求，创建一个第三方的代理接口，负责处理Github授权接口。\r\n\r\n在api目录下新建githubAuth.js文件：\r\n```js\r\n// githubAuth.js\r\nrequire(\'es6-promise\').polyfill();\r\nrequire(\'isomorphic-fetch\');\r\n\r\nmodule.exports = async (req, res) => {\r\n  // 设置请求头允许跨域\r\n  res.setHeader("Access-Control-Allow-Origin", "*");\r\n\r\n  const { query: { code } } = req;\r\n  const clientID = \'你的clientID\';\r\n  const clientSecret = \'你的clientSecret\';\r\n\r\n  const url = \'https://github.com/login/oauth/access_token?\' +\r\n    `client_id=${clientID}&` +\r\n    `client_secret=${clientSecret}&` +\r\n    `code=${code}`;\r\n\r\n  try{\r\n    await fetch(url, {\r\n      method: \'POST\',\r\n      headers: {\r\n        \'Accept\': \'application/json\',\r\n        \'Content-Type\': \'application/x-www-form-urlencoded; charset=utf-8\'\r\n      }\r\n    }).then(response => {\r\n      if(response.status === 200) {\r\n        return response.json();\r\n      }\r\n    }).then(data => {\r\n      res.json({\r\n        data\r\n      });\r\n    })\r\n  }\r\n};\r\n```\r\n可以看到`res.setHeader("Access-Control-Allow-Origin", "*")`就是我们设置的允许跨域的Header。完整的代码大家可以参考[这里](https://github.com/astonishqft/blog-server-sample)。\r\n\r\n## 🌹部署你的博客\r\n前端代码写完了就要考虑部署的问题了，这里我选择的是部署到Github Pages上，选择 github pages 的理由很简单：\r\n- 代码自动集成: github pages 集成在 github 中, 并且可以随着代码更新提交自动重新部署, 使用非常方便。\r\n- 提供免费的域名: 提供免费的 github.io 的域名, 免费部署你的静态网站，并且可以根据自己的需要配置自己的域名。\r\n- 无数量限制: github pages 没有使用的数量限制, 每一个 github repository 都可以部署为一个静态网站。\r\n\r\n具体的使用和配置方法这里我就不在叙述了，大家可以自行Google，或者参考[这里](https://pages.github.com/)。\r\n',
      reactions: {
        url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/4/reactions",
        total_count: 1,
        "+1": 1,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/3",
      repository_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io",
      labels_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/3/labels{/name}",
      comments_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/3/comments",
      events_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/3/events",
      html_url: "https://github.com/astonishqft/astonishqft.github.io/issues/3",
      id: 532667488,
      node_id: "MDU6SXNzdWU1MzI2Njc0ODg=",
      number: 3,
      title: "基于Github issues + umi 搭建一个免费的带评论功能的博客(一)",
      user: {
        login: "astonishqft",
        id: 15138753,
        node_id: "MDQ6VXNlcjE1MTM4NzUz",
        avatar_url: "https://avatars2.githubusercontent.com/u/15138753?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/astonishqft",
        html_url: "https://github.com/astonishqft",
        followers_url: "https://api.github.com/users/astonishqft/followers",
        following_url: "https://api.github.com/users/astonishqft/following{/other_user}",
        gists_url: "https://api.github.com/users/astonishqft/gists{/gist_id}",
        starred_url: "https://api.github.com/users/astonishqft/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/astonishqft/subscriptions",
        organizations_url: "https://api.github.com/users/astonishqft/orgs",
        repos_url: "https://api.github.com/users/astonishqft/repos",
        events_url: "https://api.github.com/users/astonishqft/events{/privacy}",
        received_events_url: "https://api.github.com/users/astonishqft/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 1747782053,
          node_id: "MDU6TGFiZWwxNzQ3NzgyMDUz",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/umi",
          name: "umi",
          color: "8e0f40",
          default: false,
          description: "",
        },
        {
          id: 1747782289,
          node_id: "MDU6TGFiZWwxNzQ3NzgyMjg5",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/%E5%89%8D%E7%AB%AF",
          name: "前端",
          color: "8246ea",
          default: false,
          description: "",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 3,
      created_at: "2019-12-04T12:57:50Z",
      updated_at: "2019-12-23T10:12:52Z",
      closed_at: null,
      author_association: "OWNER",
      body:
        "<p>作为一个工作了好几年的前端搬砖狗，搭建一个属于自己的博客是很有必要的，一来可以总结自己的开发学习经验，二来可以分享和记录下自己的学习轨迹，可谓好处多多，那么今天我就给大家介绍一种搭建博客的新方式。</p>\r\n\r\n![blog-2](https://user-images.githubusercontent.com/15138753/70386102-230a7000-19d0-11ea-9976-0a510f051ec2.jpg)\r\n\r\n## ✈️为什么选择Github issues而不是其他方式？\r\n其实在使用`Github issues`搭建博客之前自己就曾经尝试过其他方式搭建属于自己的博客平台，最早的时候自己买过云服务器，买的域名，搭建过一个博客系统，但是发现每次管理博客很费事，后来又做了个博客的后台管理系统，方便自己对博客进行管理，这种方式自由度很高，可以随心所欲的根据自己的想法来实现美化和改造自己的博客系统，缺点也是显而易见的，每个月的服务器租赁开销也是一笔不小的开销，时间久了就放弃了。后来还尝试过使用`hexo`框架搭建的博客，挂载到`github.io`上，这种方式不用自己租赁服务器，而且可以部署在`Github`上，但是缺点也是有的，比如自定义能力比较差，只能基于`hexo`提供的一些模版来打造自己的博客，还有就是博客的评论功能不是很完善，虽然也可以基于一些第三方的插件实现，比如“多说”，但是稳定性不是很强，使用起来比较麻烦，最后也放弃了。\r\n\r\n`Github issues`具有下面几个优点：\r\n\r\n- 天生的前后端分离\r\n\r\n借助于Github提供的API接口，我们可以轻松地和数据进行交互，比如获取issues列表数据、给某条issue点赞、给某条issue进行评论（惊喜的发现这个不就可以实现博客的评论操作了么🐶）。\r\n- 多种接口调用方式\r\n\r\n`Github`贴心的为开发者提供了两种接口调用方式，`REST API v3`接口和`GraphQL API v4`接口，你可以根据自己需要使用不同的调用方式。\r\n\r\n- `Github issues`支持`Markdown`语法，支持给`issues`加标签\r\n\r\n现在大部分人写博客都是基于`Markdown`语法来书写的，`Github issues`内置对`Markdown`语法的支持，同时，针对每条`issue`，可以设置相应的标签(Label)，甚至还可以自定义标签的颜色，这里不得不说`Github`为大家想的真是周到啊😄。\r\n\r\n- Github提供了基本的用户信息\r\n\r\n`Github`提供了获取用户的接口，用户使用`Github`账号登录后，可以获取用户的基本信息，包括用户名、头像、坐标地点、邮箱等信息，方便我们展示这些基本信息。\r\n\r\n## 🚀认识Github App\r\n### 什么是Github App\r\n前面我们说到了，基于`Github`提供的`API`，我们可以干很多事情，但是很多接口直接去调用是没法调用成功的，必须要提供认证信息才能调用成功。这里就要用到`Github App`了，那么什么是`Github  App`呢？大家可以参考下官方说法[Github App](https://developer.github.com/apps/about-apps/#about-github-apps)。\r\n\r\n简单来说，`Github App`提供了一个认证的方式，用户通过创建一个`Github App`，来设置`Github`提供的功能和权限，然后将该`App`安装到某一个`repository`中，这样这个`repository`就能获取该`Github App`所赋予的相应操作权限。\r\n\r\n### 为GitHub App识别和授权用户\r\n当我们的Github App代表用户对服务器发起请求时，必须使用用户的访问令牌授权这些请求，主要包括以下三个步骤(具体可以参考这里[Github App授权流程](https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/))：\r\n> 1. **Users are redirected to request their GitHub identity**\r\n> 2. **Users are redirected back to your site by GitHub**\r\n> 3. **Your GitHub App accesses the API with the user's access token**\r\n\r\n- 第一步：需要跳转到Github指定的授权页面进行授权\r\n授权的请求地址是：`https://github.com/login/oauth/authorize`\r\n这是一个Get请求，请求的同时还需带上以下几个参数：\r\n\r\n名称 | 类型 |  描述  \r\n-|-|-\r\nclient_id | string | **必填项**。创建`Github App`时生成的`client ID`。|\r\nredirect_uri | string | **必填项**。重定向的地址。当授权成功后会重定向到该地址，并且会将授权码在URL上一并返回，需要注意的是，这里的重定向地址必须要和我们创建`Github App`时所填写的**User authorization callback URL**保持一致。|\r\nstate | string | 非必填项。一个防止伪造攻击的随机数字符串。 |\r\nlogin | string | 非必填项。建议用于登录和授权应用程序的特定帐户。 |\r\n\r\n- 第二步：`Github`重定向回指定的`callback URL`\r\n当授权成功后，`Github`会重定向到上一步中的`callback URL`，同时会在地址栏带上一个**code**参数的授权码，接下来我们就需要通过这个授权码来获取Token。\r\n\r\n获取到授权码后，向这个地址发送一个POST请求以获取Token：\r\n`https://github.com/login/oauth/access_token`\r\n\r\n这个请求同样有些参数需要传递：\r\n\r\n名称 | 类型 |  描述 \r\n-|-|-\r\nclient_id | string | **必填项**。创建Github App时生成的`client ID`。 |\r\nclient_secret | string | **必填项**。创建Github App时生成的`client secret`。 |\r\ncode | string | **必填项**。上一步中获取的授权码。 |\r\nredirect_uri | string | **非必填项**。授权成功后的重定向地址。 |\r\nstate | string | **非必填项**。第一步中传入的随机数。 |\r\n\r\n请求成功后会得到如下的返回结果:\r\n```\r\naccess_token=e72e16c7e42f292c6912e7710c838347ae178b4a&token_type=bearer\r\n```\r\n*这个请求会存在跨域的问题，后面我会教大家如何解决这个问题*。\r\n\r\n- 第三步：使用获取的`Token`去请求`Github API`\r\n上面两步成功完成后，现在我们就可以用获取到的`Token`去调用相应的`Github API`了。\r\n\r\n上面就是一个完整的授权获取数据的过程，那么下面就介绍下如何来创建一个`Github App`。\r\n\r\n## 🌿创建一个Github App\r\n在`Github`的主页点击用户头像，选择**Settings**菜单，点击**Developer settings**菜单，即可进入**Github Apps**操作页面，点击**New Github App**按钮，即可进入到创建**Github App**的页面。\r\n![在这里插入图片描述](https://img-blog.csdnimg.cn/2019120823193173.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FzdG9uaXNocWZ0,size_16,color_FFFFFF,t_70)\r\n填写好**Github App name**、**Homepage URL**、 **User authorization callback URL**这些字段。注意因为是开发阶段，所以这里的**User authorization callback URL**地址我填写的是我本地开发环境地址，真正上线后还需要替换成`github.io`地址。\r\n\r\n接着需要设置相关权限，因为我们是用`Issues`来作为博客的数据来源，所以需要勾选上允许读写操作。\r\n![在这里插入图片描述](https://img-blog.csdnimg.cn/20191208232820926.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FzdG9uaXNocWZ0,size_16,color_FFFFFF,t_70)\r\n接下来还可以根据你自己的需要设置一些其他方面的权限，比如订阅事件，当有人评论你的`Issues`时，`Github`会自动以邮件的形式通知你，这个还是挺实用的，方便你随时对`Issues`进行回复。\r\n![在这里插入图片描述](https://img-blog.csdnimg.cn/20191208233149945.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FzdG9uaXNocWZ0,size_16,color_FFFFFF,t_70)\r\n点击**Create Github App**按钮即可完成一个`Github App`的创建过程。\r\n操作成功后即可看到完整的`Github App`信息：\r\n![在这里插入图片描述](https://img-blog.csdnimg.cn/20191208233625166.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FzdG9uaXNocWZ0,size_16,color_FFFFFF,t_70)\r\n## 🐘安装Github App\r\n前面提到过，创建的`Github App`还必须要安装到对应的`repository`，才能够在调用`API`的时候获取设置的相应权限。\r\n\r\n在刚刚创建成功的`Github App`页面，选择左侧的`Install App`菜单，然后选择你的账户去安装，这里你可以选择给所有的repository进行安装或者选择某一个指定的repository进行安装。\r\n![在这里插入图片描述](https://img-blog.csdnimg.cn/20191209000130327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FzdG9uaXNocWZ0,size_16,color_FFFFFF,t_70)\r\n## 总结\r\n至此，关于利用`Github App`获取对`Github API`的相关操作权限的部分就全部结束了。\r\n",
      reactions: {
        url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/3/reactions",
        total_count: 1,
        "+1": 1,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/2",
      repository_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io",
      labels_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/2/labels{/name}",
      comments_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/2/comments",
      events_url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/2/events",
      html_url: "https://github.com/astonishqft/astonishqft.github.io/issues/2",
      id: 520547104,
      node_id: "MDU6SXNzdWU1MjA1NDcxMDQ=",
      number: 2,
      title: "es6之扩展运算符 三个点（...）",
      user: {
        login: "astonishqft",
        id: 15138753,
        node_id: "MDQ6VXNlcjE1MTM4NzUz",
        avatar_url: "https://avatars2.githubusercontent.com/u/15138753?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/astonishqft",
        html_url: "https://github.com/astonishqft",
        followers_url: "https://api.github.com/users/astonishqft/followers",
        following_url: "https://api.github.com/users/astonishqft/following{/other_user}",
        gists_url: "https://api.github.com/users/astonishqft/gists{/gist_id}",
        starred_url: "https://api.github.com/users/astonishqft/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/astonishqft/subscriptions",
        organizations_url: "https://api.github.com/users/astonishqft/orgs",
        repos_url: "https://api.github.com/users/astonishqft/repos",
        events_url: "https://api.github.com/users/astonishqft/events{/privacy}",
        received_events_url: "https://api.github.com/users/astonishqft/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 1707711416,
          node_id: "MDU6TGFiZWwxNzA3NzExNDE2",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/es6",
          name: "es6",
          color: "4c21a8",
          default: false,
          description: "es6",
        },
        {
          id: 1707699242,
          node_id: "MDU6TGFiZWwxNzA3Njk5MjQy",
          url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/labels/javascript",
          name: "javascript",
          color: "006b75",
          default: false,
          description: "",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 5,
      created_at: "2019-11-10T03:19:20Z",
      updated_at: "2019-12-22T08:05:37Z",
      closed_at: null,
      author_association: "OWNER",
      body:
        "<p>扩展运算符在es6中是个很重要的语法，理解并学好他对于今后书写高质量的代码非常有帮助，今天就带大家来深入理解下es6中的扩展运算符(...)。</p>\r\n\r\n![facf60887c7cf16a39fcd92e55eeb71e](https://user-images.githubusercontent.com/15138753/71319104-a2ba3380-24d4-11ea-8440-a7a52cb7f2d8.jpg)\r\n\r\n## 对象的扩展运算符\r\n\r\n理解对象的扩展运算符其实很简单，只要记住一句话就可以：\r\n\r\n> **`对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中`**\r\n\r\n```javascript\r\nlet bar = { a: 1, b: 2 };\r\nlet baz = { ...bar }; // { a: 1, b: 2 }\r\n```\r\n上述方法实际上等价于:\r\n```javascript\r\nlet bar = { a: 1, b: 2 };\r\nlet baz = Object.assign({}, bar); // { a: 1, b: 2 }\r\n```\r\n`Object.assign`方法用于对象的合并，将源对象`（source）`的所有可枚举属性，复制到目标对象`（target）`。\r\n\r\n`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。(**如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性**)。\r\n\r\n同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。\r\n\r\n```javascript\r\nlet bar = {a: 1, b: 2};\r\nlet baz = {...bar, ...{a:2, b: 4}};  // {a: 2, b: 4}\r\n```\r\n\r\n利用上述特性就可以很方便的修改对象的部分属性。在`redux`中的`reducer`函数规定必须是**一个纯函数**（如果不是很清楚什么是纯函数的可以参考[这里](http://huziketang.mangojuice.top/books/react/lesson32)），`reducer`中的`state`对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。\r\n\r\n这里有点需要注意的是扩展运算符对对象实例的拷贝属于一种浅拷贝。肯定有人要问什么是浅拷贝？我们知道`javascript`中有两种数据类型，分别是*基础数据类型*和*引用数据类型*。*基础数据类型*是按值访问的，常见的*基础数据类型*有`Number`、`String`、`Boolean`、`Null`、`Undefined`，这类变量的拷贝的时候会完整的复制一份；*引用数据类型*比如`Array`，在拷贝的时候拷贝的是对象的引用，当原对象发生变化的时候，拷贝对象也跟着变化，比如：\r\n\r\n```javascript\r\nlet obj1 = { a: 1, b: 2};\r\nlet obj2 = { ...obj1, b: '2-edited'};\r\nconsole.log(obj1); // {a: 1, b: 2}\r\nconsole.log(obj2); //  {a: 1, b: \"2-edited\"}\r\n```\r\n上面这个例子扩展运算符拷贝的对象是*基础数据类型*，因此对`obj2`的修改并不会影响`obj1`，如果改成这样：\r\n\r\n```javascript\r\nlet obj1 = { a: 1, b: 2, c: {nickName: 'd'}};\r\nlet obj2 = { ...obj1};\r\nobj2.c.nickName = 'd-edited';\r\nconsole.log(obj1); // {a: 1, b: 2, c: {nickName: 'd-edited'}}\r\nconsole.log(obj2); // {a: 1, b: 2, c: {nickName: 'd-edited'}}\r\n```\r\n这里可以看到，对`obj2`的修改影响到了被拷贝对象`obj1`，原因上面已经说了，因为`obj1`中的对象`c`是一个引用数据类型，拷贝的时候拷贝的是对象的引用。\r\n\r\n## 数组的扩展运算符\r\n\r\n扩展运算符同样可以运用在对数组的操作中。\r\n\r\n - 可以将数组转换为参数序列\r\n```javascript\r\nfunction add(x, y) {\r\n  return x + y;\r\n}\r\n\r\nconst numbers = [4, 38];\r\nadd(...numbers) // 42\r\n```\r\n\r\n - 可以复制数组\r\n\r\n如果直接通过下列的方式进行数组复制是不可取的：\r\n```javascript\r\nconst arr1 = [1, 2];\r\nconst arr2 = arr1;\r\narr2[0] = 2;\r\narr1 // [2, 2]\r\n```\r\n原因上面已经介绍过，用扩展运算符就很方便：\r\n```javascript\r\nconst arr1 = [1, 2];\r\nconst arr2 = [...arr1];\r\n```\r\n还是记住那句话：**扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中**，这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。\r\n\r\n - 扩展运算符可以与解构赋值结合起来，用于生成数组\r\n```javascript\r\nconst [first, ...rest] = [1, 2, 3, 4, 5];\r\nfirst // 1\r\nrest  // [2, 3, 4, 5]\r\n```\r\n\r\n需要注意的一点是：\r\n\r\n> **如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。**\r\n\r\n```javascript\r\nconst [...rest, last] = [1, 2, 3, 4, 5];\r\n// 报错\r\nconst [first, ...rest, last] = [1, 2, 3, 4, 5];\r\n// 报错\r\n```\r\n\r\n - 扩展运算符还可以将字符串转为真正的数组\r\n```javascript\r\n[...'hello']\r\n// [ \"h\", \"e\", \"l\", \"l\", \"o\" ]\r\n```\r\n - 任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组\r\n \r\n 这点说的比较官方，大家具体可以参考阮一峰老师的[ECMAScript 6入门教程](http://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/array)。\r\n\r\n比较常见的应用是可以将某些数据结构转为数组,比如：\r\n```javascript\r\n// arguments对象\r\nfunction foo() {\r\n  const args = [...arguments];\r\n}\r\n```\r\n用于替换`es5`中的`Array.prototype.slice.call(arguments)`写法。\r\n\r\n## 总结\r\n\r\n扩展运算符的用法就说到这里，介绍的不全但都是些最常见的用法。",
      reactions: {
        url: "https://api.github.com/repos/astonishqft/astonishqft.github.io/issues/2/reactions",
        total_count: 2,
        "+1": 2,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
  ]

  const [issues, setIssues] = useState([])
  const { loading, run } = useRequest(getIssues, {
    manual: true,
    onSuccess: (result, params) => {
      setIssues(result.data)
    },
  })
  useEffect(() => {
    run()
  }, [])
  return (
    <Layout className="homepage">
      <Sider
        breakpoint="xl"
        theme="light"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        侧边栏
      </Sider>
      <Layout>
        <Header theme="light" className="tag-list">
          <Tag color="#2db7f5">REACT</Tag>
        </Header>
        <Content>
          <List
            itemLayout="vertical"
            size="large"
            // pagination={{
            //   onChange: (page) => {
            //     console.log(page)
            //   },
            //   pageSize: 3,
            // }}
            dataSource={issues}
            footer={<div style={{ textAlign: "center" }}>@ 2020 wankang</div>}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
              >
                <List.Item.Meta title={<NavLink to="/login">{item.title}</NavLink>} description={item.description} />
                <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                  <Icon type="calendar" />
                  <span style={{ marginRight: 10, marginLeft: 5 }}>{window.moment(item.created_at).format("Y-M-D")}</span>
                  {item.labels && item.labels.length !== 0 && <Icon type="tag" style={{ marginRight: 5 }} />}
                  {item.labels &&
                    item.labels.map((label) => {
                      return (
                        <Tag key={label.id} style={{ background: `#${label.color}`, color: "#fff" }}>
                          {label.name}
                        </Tag>
                      )
                    })}
                </div>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  )
}
