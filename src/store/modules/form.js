import router from "../../router";
import request from "../../utils/request";
export default {
  namespaced: true,
  state: {
    step: {
      payAccount: "123456",
      password: "111",
      receiverAccount: {
        type: "alipay",
        number: ""
      }
    }
  },
  actions: {
    async submitStepForm({ commit }, { payload }) {
      await request({
        url: "/api/form",
        method: "POST",
        data: payload
      });
      commit("saveStepFormData", { payload });
      router.push("/form/step-form/result");
    }
  },
  mutations: {
    saveStepFormData(state, { payload }) {
      state.step = {
        ...state.step,
        ...payload
      };
    }
  },
  getters: {}
};
