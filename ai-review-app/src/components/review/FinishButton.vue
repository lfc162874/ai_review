<template><button class="finish" @click="finish">结束并生成总结</button></template>
<script setup lang="ts">
const finish=()=>{
  uni.navigateTo({url:'/pages/review/result'})
}
</script>
<style scoped>.finish{width:100%;height:100rpx;line-height:100rpx;background:#3788ff;color:#fff;border-radius:40rpx;font-size:36rpx;font-weight:700}</style>