import Vue from "vue";
const memoize = require('lodash').memoize;


export const EventBus = new Vue();

const debounceTimer = {} as any;
// 一段时间 只触发第一次，key的定义 要根据当前的组件的路径 + 名称 + 用途的方式进行设置 防止重复
export function debounceByKey(key: string, func: any, timeout:number) {
  const str = `${key}#p6478==`;
  if (!debounceTimer[str]) {
    debounceTimer[str] = setTimeout(
      () => {
        func && func();
        clearTimeout(debounceTimer[str]);
        delete debounceTimer[str];
      },
      timeout);
  }
}

// 生成一个随机的 id：http://blog.csdn.net/mr_raptor/article/details/52280753
export const getRandomId = () => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};


export function resizeWindow(callback:any) {
  window.addEventListener('resize', (event) => {
    debounceByKey('resizeWindow', () => { callback(event); }, 800);
  });
}

export function setHTMLfontSize() {
  // rely on CSS for scale for better performance and more responsive
  // see reset.scss
  const width = window.innerWidth;
  const HTML = document.getElementsByTagName('html')[0];
  HTML.style.fontSize = `${(width / 1920) * 100}px`;

  // Should be marked as deprecated?
  const win: any = window;
  win.reSetHtmlFontSizeEvent && win.reSetHtmlFontSizeEvent();
  EventBus.$emit('viewport-resize');
}

// 获取图片尺寸
export function getImageSize(
  url: string,
): Promise<{ width: number; height: number }> {
  const img = document.createElement('img');

  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    img.onload = (ev) => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = reject;

    img.src = url;
  });
}

/*
  计算点位是否在区域内
  参数格式经纬度例子: Number
  checkPoint = [102,31],
  polygonPoints = [
    [102,31],
    [102,31],
    [102,31],
    ...
  ]
*/
export function isInPolygon(checkPoint:any , polygonPoints:any) {
  var counter = 0;
  var i;
  var xinters;
  var p1, p2;
  var pointCount = polygonPoints.length;
  p1 = polygonPoints[0];

  for (i = 1; i <= pointCount; i++) {
    p2 = polygonPoints[i % pointCount];
    if (
      checkPoint[0] > Math.min(p1[0], p2[0]) &&
      checkPoint[0] <= Math.max(p1[0], p2[0])
    ) {
      if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
        if (p1[0] != p2[0]) {
          xinters =
            (checkPoint[0] - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1];
          if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
            counter++;
          }
        }
      }
    }
    p1 = p2;
  }
  if (counter % 2 == 0) {
    return false;
  } else {
    return true;
  }
}

/**
 *  特定条件数据分组
 * @param arr :[]; 原数组
 * @param prop :string; 关键key
 * @param callback :function;条件
*/
export function groupBy(arr:any[], prop:string, callback:any) {
  const newArr = [];
  const tempArr = [];
  for (let i = 0, j = arr.length; i < j; i++) {
    const result = callback(arr[i], arr[i + 1], prop);
    if (result) {
      tempArr.push(arr[i]);
    } else {
      tempArr.push(arr[i]);
      newArr.push(tempArr.slice(0));
      tempArr.length = 0;
    }
  }
  return newArr;
}


export const loadjs = (url: string) =>
 new Promise((resolve) => {
  const jsElm = document.createElement('script');
  jsElm.src = url;
  jsElm.async = false;
  jsElm.onload = () => {
    resolve();
  };
  document.head.appendChild(jsElm);
});


export const loadCss = (url: string) =>
  new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });