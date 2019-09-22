[online-demo](https://www.laoge.mobi).

<p align="center"><a href="https://www.laoge.mobi" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

<p align="center">
  <a href="https://www.laoge.mobi"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
</p>

## 2019.9.18（更新）master分支为基础模板做了一些删减

## 概要
> * 使用TypeScript + JSX + vue-class-component的组合方式。
> * 实现 class 风格 tsx 格式组件文件输出。
> * 支持Vue Templeat模板语.vue文件输出。
> * 支持Sass。
> * 仅提供学习与参考。


## (dev分支)集成的小示例
- [x] 多语言
- [x] 主题更换
- [x] 右键菜单
- [x] 防拍水印
- [x] 图片绘制
- [x] 富文本编辑器
- [x] 离线百度地图
- [x] 视频播放器
- [x] 视频录制
- [x] live2d (看板娘)

<p align="center">
  <a href="https://www.laoge.mobi"><img src="https://github.com/hedongxiaoshimei/vue-tsx/blob/master/public/static/image/2019-05-18%2000.57.56.gif" alt="live2d"></a>
</p>


## 主要方案
> * Vue + Vue-Cli3 + Vuex + ES6/ES7 + TypeScript + JSX + Sass +  ElementUI

## 目录结构
``` 
    bin                    // 命令
    src 
      /assets              // 静态资源
      /components          // 公共组件
      /directive           // 指令注册
      /plugins             // 第三方库
      /locale              // 语言
      /store               // Vuex store
      /themes              // 样式主题
      /types               // 类型
      /utils               // 工具
      /views               // 业务
      /router              // 路由
      /global.ts           // 引用声明
      /app.tsx             
      /main.tsx
    tsconfig.json         // TypeScript配置
    package.json          // 依赖配置
    vue.config.js         // vue-cli3配置文件

```


## 开发规范

基础环境规范
> 基础规范采用 airbnb 的 javascript style guide，在 vscode 下的配置方法如下：
> 1. 全局安装 tslint 和 typescript：npm install -g tslint typescript
> 
> 2. 安装 vscode 的 tslint 插件：https://marketplace.visualstudio.com/items?itemName=eg2.tslint



BEM规范
```
@include b(button) {
  @include e(demo) {
    @include m(loading) {}
  }
}
编译之后
.vtx-button__demo--loading {}
```

## 如何开发组件

* 通用基础index.tsx组件模板介绍 (使用 npm run new ... 生成组件文件)
  
```bash
// 在components文件夹内生成一个ComponentName文件夹 包含index.tsx和style.scss
npm run new ComponentName 
```

```
// 生成的index.tsx
import { Component, Vue } from 'vue-property-decorator';
import './style.scss';

@Component<ComponentName>({
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class ComponentName extends Vue {

  render() {              // jsx语法中的render函数,渲染dom结构.
    return (
      <div></div>
    );
  }

  created() {}             // 组件生命周期函数

  mounted() {}

  destroyed() {}

} 
```


* 基础组件实例参考

> * render函数

```
import { Component, Vue } from 'vue-property-decorator';
import SubComponent from './SubComponent';
@Component<ComponentName>({
  components: {
    'sub-component': SubComponent,
  }
})

export default class ComponentName extends Vue {
  list = [1,2,3]

  render() {              
    return (
      <ul> 
        {
          this.list.map((i) => {
            return this.renderListItem()
          })
        }
        {
          this.list.map((i) => {
            return (
              <sub-component />
            )
          })
        }
      </ul>
    );
  }
  // 可以嵌套多个render函数 (推荐以拆分子组件形式 代替render嵌套)
  // 必须Dom且只有一个父节点
  // 写在render(h)之后 生命周期之前
  renderListItem() {
    return (
      <li>
        <span> {i} </span>
      </li>
    );
  }  

} 
```

> *  属性定义/泛型定义

```
import { Component, Vue } from 'vue-property-decorator';
@Component<ComponentName>({})

// 定义泛型 问号代表可以没有项属性 
interface IlistItem = {
  name: string,
  total: number,
  remark: string,
  children?: Ichildren[],  // 嵌套另一个泛型
}

interface Ichildren {
  name: string,
  tile: string,
}

export default class ComponentName extends Vue {

  //  类似于Vue写法中的data 有多种方式
  list = []                                   // 1.直接赋值空数组
  visible: boolean = false;                   // 2.加类型再赋值
  obj: any = {}                               // 3.加类型再赋值 any实际为不限内部类型
  list: any[] = []                            // 4.加类型再赋值 any实际为不限内部类型
  tslist: IlistItem[] = []                    // 5.加泛型再赋值 结构与类型与泛型保持一致 通常用来校验服务数据/或组件通信

  render() {              
    return (
      <div></div>
    );
  }

  mounted() {
    this.tslist = [1,2,3];                      // 错误 与泛型不一致
    this.tslist = [                             // 正确 与泛型一致
      {
        name: 'haha',
        total: 2,
        remark:'asd',
      },
      {
        name: 'haha',
        total: 2,
        remark:'asd',
        children:[
          {
            name: 'children1',
            tile: 'children1',
          },
          {
            name: 'children2',
            tile: 'children2',
          },
        ],
      },
    ] 
  }
} 
```


> *  事件绑定 (function写在生命周期之后)

```
import { Component, Vue } from 'vue-property-decorator';

@Component<ComponentName>({})

export default class ComponentName extends Vue {

  
  render() {              
    return (
      // 事件绑定
      <div
        // onClick={(e) => {this.handleClick('string',e:any);}}  // 使用箭头函数 一般用于需要接收参数
        onClick={this.emitClick}            // 无需接收参数时的绑定方式
      > 
        dom结构
      </div>
    );
  }

  // 事件绑定 定义function
  handleClick(str,e?) {}                    //问号表示参数为非必传 如多个参数中含非必传 非必传放后面,
  

}
```


> * 组件通信

```
import { Component, Vue } from 'vue-property-decorator';
import SubComponent from '../SubComponent'   // 引入子组件

@Component<ComponentName>({
  components: {
    'sub-component': SubComponent,
  },
  props:{
    visibleFromProps: {               // 接收父组件传递属性
      type: Boolean,                  // 定义接收类型
      require: false,                 // 是否为必须
      default: false                  // 定义默认值
    },
  },
})

export default class ComponentName extends Vue {
  readonly visibleFromProps!: boolean;         // 组件定义this指向的实体属性(如无需更改则添加属性readonly)
  visible = false;

  render(h) {
    return (
      <div onClick={(e:any) => {this.emitClick('hi',e:any)}}>
        <sub-component
          onSubmit={this.submitClick}     // 将某个方法 传给子组件以on开头的驼峰格式传入
          visible={this.visible}          // 属性传递
        />
      </div>
    );
  }

  // emit执行父组件传入的方法 注意问号参数代表非必传 顺序靠后
  emitClick(type:any,e?) {
    this.$emit('visibleClick',type);
  }

  // 定义某个方法 传给子组件
  submitClick() {}

}
```

> *  通过refs操作dom

```
import { Component, Vue } from 'vue-property-decorator';
import SubComponent from '../SubComponent';

@Component<ComponentName>({
  components: {
    'sub-component': SubComponent,
  }
})

export default class ComponentName extends Vue {

  $refs: {
    subcomponent!: any,                       // 如果是组件 则为any
  };
  
  render(h) {              
    return (
      <div>
        <sub-component  ref="subcomponent" />               // 绑定refs
      </div>
    );
  }

  mounted() {
    this.$nextTick(() => {                   // 一些组件需等全部渲染完之后再获取
    }) 
  }
} 
```

# vue-cli3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).