<template>
  <div>
    <h1>欢迎您：王波老师</h1>

    <br />

    <h1>读取excel表格</h1>
    <form>
      <input type="file" @change="read" />
    </form>
    <table>
      <tr>
        <td>#</td>
        <td>学号</td>
        <td>姓名</td>
        <td>成绩</td>
      </tr>
      <tr v-for="(s, index) in students" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ s.number }}</td>
        <td>{{ s.name }}</td>
        <td>{{ s.score }}</td>
      </tr>
    </table>

    students:{{ students }}
    <br />
    <button type="button" @click="Submit">提交名单</button>

    课程：
    <form>
      <select v-model="id">
        <option v-for="(c, index) in courses" :key="index" :value="c.id"
          >{{ c.name }}
        </option>
      </select>
      <br />
      权重：<input type="number" v-model="weight" />
      <br />
      最低分：<input type="number" v-model="lowestScore" />
      <br />
      <button type="button" @click="setWeight">修改</button>
    </form>

    <br />
    设置实际指导学生数：
    <form>
      学生数：<input
        type="number"
        v-model="totalStudents"
        value="teacher.qualifiedNum"
      /><button type="button" @click="patchAmount">
        提交
      </button>
    </form>
    <br />

    所有信息：
    <table style="center">
      <thead>
        <td>可接受学生数</td>
        <td>符合条件学生数</td>
      </thead>

      <tr>
        <td>{{ teacher.qualifiedNum }}</td>
        <td>{{ teacher.actualNum }}</td>
      </tr>
    </table>

    已经接受的学生：
    <ul>
      <li v-for="(s, index) in stus" :key="index">{{ s.name }}</li>
    </ul>

    <br />

    课程信息:
    <table>
      <thead>
        <td>#</td>
        <td>课程名</td>
        <td>权重</td>
        <td>最低分</td>
      </thead>

      <tr v-for="(c, index) in courses" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ c.courseName }}</td>
        <td>{{ c.weight }}</td>
        <td>{{ c.minScore }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { readStudentFile } from "@/util/ExcelUtils.js";
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("backendIndex");
    console.log(this.teacher);
  },
  data: () => ({
    id: null,
    weight: null,
    lowestScore: null,
    totalStudents: null,
    students: null
  }),
  methods: {
    read(event) {
      //读取文件,获得学生成绩单
      let file = event.target.files[0];
      readStudentFile(file).then(data => {
        this.students = data;
        console.log("vue");
      });
    },
    setWeight() {
      this.$store.dispatch("setWeight", {
        id: this.id,
        weight: this.weight,
        minScore: this.lowestScore
      });
      location.reload();
    },
    patchAmount() {
      this.$store.dispatch("patchAmount", {
        qualifiedNum: this.totalStudents
      });
      location.reload();
    },
    Submit() {
      var _this = this;
      this.students.forEach(function(e) {
        _this.$store.dispatch("submitStudent", {
          name: e.name,
          studentId: e.number
        });
      });
    }
  },
  computed: {
    ...mapState(["role", "teacher", "courses", "stus"])
  }
};
</script>
