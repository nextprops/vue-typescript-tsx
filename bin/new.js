"use strict";
const path = require("path");
const fileSave = require("file-save");
let componentName = process.argv[2];

process.on("exit", () => {
  console.info();
});

let defaultPath = '../src/components'
if (!process.argv[2]) {
  console.error("[组件名]必填 - Please enter new component name");
  process.exit(1);
}

const paths = process.argv.slice(2, process.argv.length);
// 如果有第二个参数 表示该组件在modules的子文件夹中
if (paths[1]) {
  // 新建模块主模块
  if (paths[1] === componentName) {
    defaultPath = `../src/views`;
  } else {
    // 新建模块子组件
    const path = paths.join('/');
    defaultPath = `../src/views/${path}`;
  }
}
let componentPath = '';
if (paths.length >= 2) {
  if (paths[0] === paths[1]) {
    componentPath = path.resolve(__dirname, defaultPath, componentName)
  } else {
    // 超过长度以最后一个值作为组件名
    componentName = paths[paths.length - 1];
    componentPath = path.resolve(__dirname, defaultPath)
  }
} else {
  componentPath = path.resolve(__dirname, defaultPath, componentName)
}
// 处理test 的import 路径
const testImportpath = (paths.length < 2 || (paths.length >= 2 && paths[0] === paths[1])) ? "/" + componentName : '';
const className = componentName.substring(0,1).toLowerCase() + componentName.substring(1);;
const Files = [
  {
    filename: "index.tsx",
    content: `
import { Component, Vue } from 'vue-property-decorator';
import './style.scss';

@Component<${componentName}>({
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class ${componentName} extends Vue {
  render () {
    return (
      <div class="vtx-${className}"></div>
    );
  }
  created() {}
  mounted() {}
  beforeDestroy() {}
}`
  },
  {
    filename: "style.scss",
    content: `
    @import 'src/themes/mixins/mixins.scss';
    
    @include b(${className}) {

    }`
  },
];


// 创建 component
Files.forEach(file => {
  fileSave(path.join(componentPath, file.filename))
    .write(file.content, "utf8")
    .end("\n");
});



console.info("新建tsx组件完成!");
