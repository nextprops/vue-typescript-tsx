import { Component, Vue } from 'vue-property-decorator'

@Component<TsxStyle>({
  components: {},
  computed: {},
  methods: {},
  watch: {},
})
export default class TsxStyle extends Vue {

  render() {
    return (
      <div class="vtx-home">
        <div class="vtx-home__title">
          <router-link to="/vueStyle">VeStyle文件</router-link>
          <router-link to="/TsxStyle">TsxStyle文件</router-link>
        </div>
        <h1>TsxStyle.tsx</h1>
      </div>
    );
  }

  mounted() { }
}