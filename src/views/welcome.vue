<template>
  <div>
    <!-- <h1>您已成功选择导师，请不要重复选择，祝您毕业顺利</h1> -->
    <template>
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>您已成功选择导师 祝您毕业顺利 </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">走过的路，我们共同挥汗</v-card-subtitle>
        <v-card-subtitle class="pb-0">吃过的苦，我们共同回味</v-card-subtitle>
        <v-card-subtitle class="pb-0">笑过的甜，我们共同分享</v-card-subtitle>
        <v-card-subtitle class="pb-0">祝前程似锦</v-card-subtitle>
      </v-card>
    </template>
    <br />
    <v-btn min-width="200" rounded color="success" dark @click="loginout"
      >退出</v-btn
    >
  </div>
</template>

<script>
export default {
  methods: {
    loginout() {
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("authorization");
      location.reload();
    }
  }
};
</script>
