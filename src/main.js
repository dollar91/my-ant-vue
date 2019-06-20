import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "query-string";
import VueI18n from "vue-i18n";
import VueHighlightJS from "vue-highlightjs";
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
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue";
import "highlight.js/styles/github.css";

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
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(Auth);
Vue.use(LocaleProvider);
Vue.use(VueI18n);
Vue.use(VueHighlightJS);
Vue.component("Authorized", Authorized);
Vue.component("IconFont", IconFont);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
