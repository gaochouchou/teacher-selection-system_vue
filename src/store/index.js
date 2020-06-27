/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";
import { author } from "@/util/Const";

Vue.use(Vuex);

const myState = {
  exception: { message: null },
  isLogin: false,
  role: "none",
  teacher: null,
  courses: null,
  stus: null,
  ifselected: false
};

const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.GET_EXCEPTION](state, data) {
    console.log("exception");
    console.log(data);
    state.exception = data;
  },
  [types.SET_ROLE](state, data) {
    state.role = data;
  },
  teacher(state, data) {
    console.log(data);
    state.teacher = data;
  },
  courses(state, data) {
    state.courses = data;
  },
  students(state, data) {
    state.stus = data;
  },
  ifselected(state, data) {
    state.ifselected = data;
  }
};

const myActions = {
  //登录
  async [types.TEACHERLOGIN]({ commit }, data) {
    let resp = await axios.post("teacherLogin", data);
    let auth = resp.headers[author];
    console.log("teacher" + resp.data.teacher);
    console.log("storerole" + resp.data.role);
    if (auth != null) {
      sessionStorage.setItem(author, auth);
      sessionStorage.setItem("role", resp.data.role);
      commit(types.LOGIN, true);
      commit(types.SET_ROLE, resp.data.role);
    }
  },

  async [types.STUDENTLOGIN]({ commit }, data) {
    let resp = await axios.post("studentLogin", data);
    let auth = resp.headers[author];
    console.log("teacher" + resp.data.teacher);
    console.log(resp.data);
    if (auth != null) {
      sessionStorage.setItem(author, auth);
      sessionStorage.setItem("role", resp.data.role);
      commit(types.LOGIN, true);
      commit(types.SET_ROLE, resp.data.role);
    }
  },

  async backendIndex({ commit }, data) {
    let resp = await axios.get("teacher/index");

    console.log(resp.data.teacher);
    console.log(resp.data.students);
    console.log(resp.data.courses);
    commit("teacher", resp.data.teacher);
    commit("courses", resp.data.courses);
    commit("students", resp.data.students);
  },

  async studentIndex({ commit }, data) {
    let resp = await axios.get("student/index");

    commit("ifselected", resp.data.IfSelected);
    commit("courses", resp.data.courses);
    console.log("ifselected" + resp.data.IfSelected);
  },

  async [types.STUDENT_SUBMIT]({ commit }, data) {
    let resp = await axios.post("student/submit", data);
    commit("ifselected", resp.data.succeed);
    console.log("student/submit");
  },

  async setWeight({ commit }, data) {
    let resp = await axios.post("teacher/setWeight", data);
  },

  async setAmount({ commit }, data) {
    let resp = await axios.post("teacher/postAmount", data);
  },
  async selectStudnet({ commit }, data) {
    console.log("发出axios");
    let resp = await axios.post("teacher/selectStudent", data);
  }
};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// 执行时判断，刷新时检测；也可以添加长度等更严格判断
if (sessionStorage.getItem(author) != null) {
  myState.isLogin = true;
}

if (sessionStorage.getItem("role") != null) {
  myState.role = sessionStorage.getItem("role");
}
