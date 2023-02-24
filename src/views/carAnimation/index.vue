<!--
 * @Description: carAnimation
 * @Author: web.wangxingren
 * @Date: 2023-02-24 11:38:46
 * @LastEditors: web.wangxingren
 * @LastEditTime: 2023-02-24 12:39:18
 * @FilePath: /vue3-avator-ts/src/views/carAnimation/index.vue
-->
<template>
  <div class="car-page">
    <ul>
      <li v-for="item in 10" :key="item" class="main-item">
        <span>商品{{ item }}</span>
        <button @click="handleAdd">+</button>
      </li>
    </ul>
    <div ref="carRef" class="shop-car">
      <img src="@/assets/car.png" alt="" srcset="" />
    </div>
    <!-- <div class="car-circle" style="--left:800px;--top:300px;--y:500px;--x:-200px;">
      <div class="car-circle-icon">+</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

const carRef = ref();
const ICON_SIZE = 20;
const handleAdd = (e: Event) => {
  // 创建动画icon
  const div = document.createElement("div");
  div.className = "car-circle";
  div.innerHTML = "<div class='car-circle-icon'>+</div>";
  // 获取icon初始位置
  const target = e.target as HTMLInputElement;
  const btnRect = target.getBoundingClientRect();
  console.log(btnRect);
  const left: number = btnRect.left + btnRect.width / 2 - ICON_SIZE / 2;
  const top: number = btnRect.top - ICON_SIZE;
  div.style.setProperty("--left", `${left}px`);
  div.style.setProperty("--top", `${top}px`);
  // 获取icon结束位置/购物车位置
  const carRect = carRef.value.getBoundingClientRect();
  const x: number = carRect.left + carRect.width / 2 - ICON_SIZE / 2 - left;
  const y: number = carRect.top + ICON_SIZE - top;
  div.style.setProperty("--x", `${x}px`);
  div.style.setProperty("--y", `${y}px`);
  // 动画结束删除icon
  div.addEventListener("animationend", () => {
    div.remove();
  });
  document.body.appendChild(div);
};
</script>

<style lang="scss" scoped>
.car-page {
  position: relative;
  width: 400px;
  height: 600px;
  margin: auto;
  border: 2px solid #ddd;
  .main-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    button {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }

  .shop-car {
    position: absolute;
    left: 20px;
    bottom: 20px;
    z-index: 10;
    width: 40px;
    height: 40px;
  }

  .shop-car > img {
    width: 100%;
  }
}
</style>

<style lang="scss">
.car-circle {
  position: fixed;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 20px;
  left: var(--left);
  top: var(--top);
  /* border: 2px solid #454545; */
}

.car-circle-icon {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: #ff6c44;
  color: #fff;
  text-align: center;
}
@keyframes moveY {
  to {
    transform: translateY(var(--y));
  }
}

.car-circle {
  --duration: 0.8s;
  animation: moveY var(--duration) cubic-bezier(0.5, -0.5, 1, 1);
}

@keyframes moveX {
  to {
    transform: translateX(var(--x));
  }
}

.car-circle-icon {
  animation: moveX var(--duration) linear;
}
</style>
