import Vue from "vue";
import Router from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "./views/404";

Vue.use(Router);
console.log("process.env.BASE_URL", process.env.BASE_URL);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
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
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
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
      component: { render: h => h("router-view") },
      children: [
        {
          path: "/form/basic-form",
          name: "basicform",
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
        },
        {
          path: "/form/step-form",
          name: "stepform",
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
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});
router.beforeEach((to, from, next) => { /* eslint-disable-line */
  Nprogress.start();
  next();
});
router.afterEach((to, from) => { /* eslint-disable-line */
  Nprogress.done();
});

export default router;
