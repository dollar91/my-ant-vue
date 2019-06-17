import Vue from "vue";
import Router from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "./views/404";
import { notification } from "ant-design-vue";
import findLast from "lodash/findLast";
import Forbidden from "./views/403";
import { check, isLogin } from "./utils/auth";

Vue.use(Router);
console.log("process.env.BASE_URL", process.env.BASE_URL);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "userlayout" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "register" */ "./views/User/Register.vue")
        }
      ]
    },
    {
      path: "/",
      // meta: { authority: ["user", "admin"] },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
            }
          ]
        }
      ]
    },
    {
      path: "/form",
      name: "form",
      meta: { icon: "form", title: "表单", authority: ["admin"] },
      component: { render: h => h("router-view") },
      children: [
        {
          path: "/form/basic-form",
          name: "basicform",
          meta: { title: "基础表单" },
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
        },
        {
          path: "/form/step-form",
          name: "stepform",
          hideChildrenInMenu: true,
          meta: { title: "分布表单" },
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
          children: [
            {
              path: "/form/step-form",
              redirect: "/form/step-form/info"
            },
            {
              path: "/form/step-form/info",
              name: "info",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1")
            },
            {
              path: "/form/step-form/confirm",
              name: "confirm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2")
            },
            {
              path: "/form/step-form/result",
              name: "result",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3")
            }
          ]
        }
      ]
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden
    },
    {
      path: "*",
      name: "404",
      component: NotFound,
      hideInMenu: true
    }
  ]
});
router.beforeEach((to, from, next) => { /* eslint-disable-line */
  if (to.path !== from.path) {
    Nprogress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  console.log(record);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
    Nprogress.done();
  }
  next();
});
router.afterEach((to, from) => { /* eslint-disable-line */
  Nprogress.done();
});

export default router;
