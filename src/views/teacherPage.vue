<template>
  <div>
    <template>
      <v-card>
        <v-system-bar></v-system-bar>
        <v-toolbar flat>
          <v-toolbar-title>
            <h1>欢迎您：{{ teacher.name }}老师</h1>
          </v-toolbar-title>
          <v-spacer>
            <div class="my-2">
              <v-btn large color="primary" @click="loginout">退出登录</v-btn>
            </div>
          </v-spacer>
        </v-toolbar>
      </v-card>
    </template>
    <!-- {{ role }}
    teacher:{{ teacher }} courses:{{ courses }}status:{{ stus }} -->
    <v-container fluid>
      <v-row>
        <v-col col="4">
          <template>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">已选学生名单</div>
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">学生姓名</th>
                            <th class="text-left">学生学号</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(s, index) in stus" :key="index">
                            <td class="text-left">
                              {{ s.name }}
                            </td>
                            <td class="text-left">{{ s.studentId }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </template>
        </v-col>

        <v-col col="4">
          <template>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">课程信息</div>
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">课程名称</th>
                            <th class="text-left">课程权重</th>
                            <th class="text-left">课程最低分数</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(c, index) in courses" :key="index">
                            <td class="text-left">{{ c.name }}</td>
                            <td class="text-left">{{ c.weight }}</td>
                            <td class="text-left">{{ c.minScore }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </template>
        </v-col>
        <v-col col="4">
          <template>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">学生数量统计</div>
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">可接受学生数</th>
                            <th class="text-left">已选学生数</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-left">
                              {{ teacher.qualifiedNum }}
                            </td>
                            <td class="text-left">
                              {{ teacher.actualNum - 1 }}
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </template>
        </v-col>
      </v-row>

      <v-row>
        <v-col col="4">
          <template>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">读取Excel表格新增学生数据</div>
                  <form>
                    <template>
                      <!-- <v-file-input
                        accept=".xls"
                        label="导入学生文件"
                        type="file"
                        >
                      /></v-file-input> -->
                      <input type="file" @change="read" />
                    </template>
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
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn text @click="Submit">提交名单</v-btn>
                <!-- <v-btn text>Button</v-btn> -->
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
        <v-col col="4">
          <template>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">设置课程最低分</div>
                  <form ref="formset">
                    请选择课程：
                    <select v-model="id" style="border:1px solid black">
                      <option
                        v-for="(c, index) in courses"
                        :key="index"
                        :value="c.id"
                        >{{ c.name }}
                      </option>
                    </select>
                    <br />
                    <v-col cols="12">
                      <v-text-field
                        v-model="weight"
                        label="权重"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <br />
                    <v-col cols="12">
                      <v-text-field
                        v-model="lowestScore"
                        label="最低分"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </form>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn text @click="setWeight" type="button">确认修改</v-btn>
                <!-- <v-btn text>Button</v-btn> -->
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
        <v-col col="4">
          <template>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">设置指导学生上限</div>
                  <form ref="formmaxwidth">
                    <v-col cols="12">
                      <v-text-field
                        v-model="totalStudents"
                        label="指导学生上限"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </form>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn text @click="patchAmount" type="button">确认修改</v-btn>
                <!-- <v-btn text>Button</v-btn> -->
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="4">
          <template>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">单独添加学生</div>
                  <form ref="form">
                    <v-col cols="12">
                      <v-text-field
                        v-model="addstudentid"
                        label="输入学生学号"
                      ></v-text-field>
                      <v-text-field
                        v-model="addstudentname"
                        label="输入学生姓名"
                      ></v-text-field>
                    </v-col>
                  </form>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn text @click="addstudent" type="button">确认修改</v-btn>
                <!-- <v-btn text>Button</v-btn> -->
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
        <v-col col="4"> </v-col>
        <v-col col="4"></v-col>
      </v-row>
    </v-container>
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
    students: null,
    sticky: true,
    files: null,
    addstudentid: null,
    addstudentname: null
  }),
  methods: {
    read(event) {
      console.log("读取文件");
      //读取文件,获得学生成绩单
      let file = event.target.files[0];
      console.log(file);
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
      this.$refs.formset.reset();
    },
    patchAmount() {
      this.$store.dispatch("setAmount", {
        qualifiedNum: this.totalStudents
      });
      this.$refs.formset.reset();
    },
    Submit() {
      var _this = this;
      this.students.forEach(function(e) {
        _this.$store.dispatch("submitStudent", {
          name: e.name,
          studentId: e.number
        });
      });
    },
    loginout() {
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("authorization");
      location.reload();
    },
    addstudent() {
      this.$store.dispatch("selectStudnet", {
        studentId: this.addstudentid,
        name: this.addstudentname
      });
      this.$refs.form.reset();
      this.$store.dispatch("backendIndex");
    }
  },
  computed: {
    ...mapState(["role", "teacher", "courses", "stus"])
  }
};
</script>
