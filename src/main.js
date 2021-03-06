import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@store/store";
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 ,locale}).use(router).use(store)
app.mount('#app')
