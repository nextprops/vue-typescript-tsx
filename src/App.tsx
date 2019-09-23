import { Component, Vue } from 'vue-property-decorator'
import { resizeWindow, setHTMLfontSize } from '@/utils/global';
import { debounceByLast } from '@/utils/object'
import { initHeaders } from "@/apiService/apiBase/apiRequest";

@Component<App>({
  components: {},
  computed: {
    isDev() {
      return process.env.NODE_ENV === 'development';
    }
  },
  methods: {},
  watch: {
    theme(val) {
      this.className = `theme-${val}`;
    },
  },
})
export default class App extends Vue {
  readonly updateDocWidth!: (res: any) => void;
  readonly theme!: string;
  readonly isDev!: boolean;

  className = 'theme-';
  refs: any = {};
  
  render() {
    return (
      <div id="app" class={this.className}>
        <router-view/>
      </div>
    );
  }

  
  mounted() {
    initHeaders('');
    this.className = `theme-${this.theme}`
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
    this.initClientSize();
  }

  initClientSize() {
    this.changeSize();
    window.onresize = () => {
      debounceByLast('debounceByLast-updateDocWidth', this.changeSize, 200)
    };
  }
  changeSize(){
    //获取网页可见区域宽度
    const docWidth = document.body.clientWidth;
    const docHeight = document.body.clientHeight;
    console.log('网页可见区域宽高',docWidth,docHeight)
    
  }
}