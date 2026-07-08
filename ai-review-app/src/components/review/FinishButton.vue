<template>
  <button class="finish" @click="finish">结束并生成总结</button>
</template>

<script setup lang="ts">
const finish = () => {
  uni.navigateTo({ url: '/pages/review/result' })
}
</script>

<style scoped>
.finish {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background: #3788ff;
  color: #fff;
  border-radius: 36rpx;
  font-size: 34rpx;
  font-weight: 700;
  border: none;
  margin-top: 24rpx;
  box-shadow: 0 10rpx 30rpx rgba(55, 136, 255, 0.25);
}
</style>
