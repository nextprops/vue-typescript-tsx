<template>
  <div class="vtx-home">
    <div class="vtx-home__title">
      <router-link to="/vueStyle">VueStyle文件</router-link>
      <router-link to="/TsxStyle">TsxStyle文件</router-link>
    </div>
    <h1>VueStyle.tsx</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
@import "src/themes/mixins/mixins.scss";

@include b(home) {
  padding: 0 5vw;
  height: calc(100% - 0.9rem);
  min-height: calc(100% - 0.9rem);
  @include e(title) {
    height: 0.74rem;
  }
  @include e(content) {
    height: calc(100% - 0.74rem);
    .terminal_wrap {
      width: 50%;
      height: 100%;
      /deep/ .terminal {
        height: 100%;
      }
    }
  }
}
</style>
