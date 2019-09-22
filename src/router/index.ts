import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
let routes = [
  {
    name: 'index',
    path: '/',
    redirect: '/vueStyle',
  },
  {
    name: 'vueStyle',
    path: '/vueStyle',
    component: () => import(/* webpackChunkName: "vueStyle" */ '../views/VueStyle.vue'),
  },
  {
    name: 'tsxStyle',
    path: '/tsxStyle',
    component: () => import(/* webpackChunkName: "TsxStyle" */ '../views/TsxStyle'),
  }
] as any[];

export default new Router({
  base: process.env.BASE_URL,
  routes
})
