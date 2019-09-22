import omit  from 'lodash';
import pick  from 'lodash';
import cloneDeep  from 'lodash';

export function deepCopy(src: any) {
  return cloneDeep(src);
}

export function pickKeys(src: any, keys: string[]) {
  return pick(src, keys);
}

export function omitKeys(src: any, keys: string[]){
  return omit(src, keys);
}
const debounceTimer = {} as any;
// 一段时间 只触发第一次，key的定义 要根据当前的组件的路径 + 名称 + 用途的方式进行设置 防止重复
export function debounceByKey(key: any, func: any, timeout: any) {
  const str = `${key}#p6478==`;
  if (!debounceTimer[str]) {
    debounceTimer[str] = setTimeout(
      () => {
        func();
        clearTimeout(debounceTimer[str]);
        delete debounceTimer[str];
      },
      timeout);
  }
}

const myWindow = window as any
// 一段时间 只触发最后一次，key的定义 要根据当前的组件的路径 + 名称 + 用途的方式进行设置 防止重复
export function debounceByLast(key: any, func: any, timeout: any) {
  const str = `${key}#m6978==`;
  myWindow[str] && (clearTimeout(myWindow[str]));
  myWindow[str] = setTimeout(
    () => {
      func();
      myWindow[str] = null;
    },
    timeout);
}

export function merge(oldObj: any, newObj: any) {
  for (const key in newObj) {
    if (newObj[key]) {
      oldObj[key] = newObj[key];
    }
  }
  return oldObj;
}

export function mapToArray(map: any) {
  let resp = [] as any;
  for (const o in map) {
    resp = resp.concat(map[o]);
  }
  return resp;
}

export function keyCount(map: any) {
  let count = 0;
  for (const o in map) {
    count = count + 1;
  }
  return count;
}

