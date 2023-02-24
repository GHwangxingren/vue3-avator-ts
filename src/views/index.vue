<!--
 * @Description: 主页
 * @Author: web.wangxingren
 * @Date: 2023-02-24 11:15:01
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2023-02-24 11:44:03
 * @FilePath: /vue3-avator-ts/src/views/index.vue
-->
<template>
  <div class="home">
    <div v-for="item in btnList" :key="item.path" class="item" @click="goPage(item)">{{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
interface IPath {
  path: string;
  name: string;
}
const router = useRouter();
const btnList: Array<IPath> = reactive([
  {
    path: "AvatorMain",
    name: "Avatar生成器"
  },
  {
    path: "CarAnimation",
    name: "购物车动画"
  }
]);

const goPage = (item: IPath) => {
  router.push({
    name: item.path
  });
};
</script>

<style lang="scss" scoped>
.home {
  padding: 50px;
  display: flex;
  // // align-items: center;
  // justify-content: center;
}
.item {
  padding: 10px;
  border: 1px solid #999;
  border-radius: 4px;
  margin-right: 20px;
  cursor: pointer;
}
</style>