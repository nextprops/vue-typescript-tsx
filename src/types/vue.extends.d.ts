import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {}
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {}
}