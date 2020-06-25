<template>
  <div>
    <p>毕业设计导师学生互选平台</p>
    <p>
      <br />
    </p>
    <br />
    <form ref="form">
      学号/工号：<input v-model="num" type="text" />
      <br />
      密码：<input v-model="password" type="password" />
      <br />
      <p>是否登陆：{{ isLogin }}</p>
      <button @click="login" type="button">登录</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { TEACHERLOGIN } from "@/store/types.js";
export default {
  data: () => ({
    num: null,
    password: null
  }),
  methods: {
    login() {
      this.$store.dispatch(TEACHERLOGIN, {
        username: this.num,
        password: this.password
      });
      this.$refs.form.reset();
    }
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
