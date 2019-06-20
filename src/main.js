import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";
import {
  Button,
  Layout,
  Breadcrumb,
  Menu,
  Icon,
  Drawer,
  Radio,
  Form,
  Input,
  Select
} from "ant-design-vue";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1252427_kzpuh1tlwfj.js"
});
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Auth);
Vue.component("Authorized", Authorized);
Vue.component("IconFont", IconFont);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
