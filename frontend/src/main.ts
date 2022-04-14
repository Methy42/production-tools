import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'ant-design-vue/dist/antd.css';
import "@/style/global.scss";
import NavBarServices from './modules/layout/services/NavBar.service';
import NavBar from './modules/layout/models/NavBar.model';
import Article from './modules/article/models/Article.model';

const app = createApp(App);
app.use(Antd);
app.use(store);
app.use(router);

const navBarService = new NavBarServices();
console.log("see service", navBarService);
navBarService.getNavBarData({ params: { test: "test" } });

console.time("test")
const navbar = new NavBar();
const article = new Article();
console.timeEnd("test")

app.mount('#app');
(window as any).context = app;