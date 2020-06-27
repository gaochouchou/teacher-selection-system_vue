<template>
  <div>
    <welcome v-if="ifselected == true"></welcome>
    <div v-if="ifselected == false">
      <v-card-text vertical-align:middle>
        <h1>毕业设计导师选择系统</h1>
        <!-- courses:{{ courses }} -->
        <h3>请输入以下课程成绩</h3></v-card-text
      >

      <template>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="frame"
                  :rules="nameRules"
                  :counter="3"
                  label="Web系统框架"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="web"
                  :rules="nameRules"
                  :counter="3"
                  label="web开发技术成绩"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="java"
                  :rules="nameRules"
                  :counter="3"
                  label="Java程序设计"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <div class="text-center">
            <v-btn min-width="200" rounded color="primary" dark @click="submit"
              >提交</v-btn
            >
            <v-btn
              min-width="200"
              rounded
              color="success"
              dark
              @click="loginout"
              >退出</v-btn
            >
          </div>
        </v-form>
      </template>
    </div>
  </div>
</template>
<script>
import { STUDENT_SUBMIT } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  components: {
    welcome: () => import("./welcome")
  },
  created() {
    this.$store.dispatch("studentIndex");
    // console.log("page" + this.students);
  },
  data: () => ({
    frame: null,
    web: null,
    java: null,
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "score is required",
      v => v.length <= 3 || "score must be less than 3 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    submit() {
      console.log("submit");
      console.log(this.frame);
      this.$store.dispatch(STUDENT_SUBMIT, {
        courses: [
          { score: this.frame, course: { name: "Frame" } },
          { score: this.web, course: { name: "web" } },
          { score: this.java, course: { name: "Java" } }
        ]
      });
      // location.reload();
      this.$refs.form.reset();
    },
    loginout() {
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("authorization");
      location.reload();
    }
  },
  computed: {
    ...mapState(["ifselected", "courses"])
  }
};
</script>
