<template>
  <v-card class="mx-auto" max-width="500">
    <br />
    <br />
    <br />
    <h1>毕业设计导师学生互选平台</h1>
    <p>
      <br />
    </p>
    <br />
    <v-form ref="form">
      <v-text-field
        v-model="num"
        :counter="10"
        label="学号/工号"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :counter="10"
        label="密码"
        type="password"
        required
      ></v-text-field>

      <br />
      <!-- <p>是否登陆：{{ isLogin }}</p> -->
      <v-btn class="ma-2" x-large tile color="indigo" dark @click="login"
        >教师登录</v-btn
      >
      <v-btn class="ma-2" x-large tile color="success" dark @click="slogin"
        >学生登录</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { TEACHERLOGIN } from "@/store/types.js";
import { STUDENTLOGIN } from "@/store/types.js";
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
    },
    slogin() {
      this.$store.dispatch(STUDENTLOGIN, {
        studentId: this.num,
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
