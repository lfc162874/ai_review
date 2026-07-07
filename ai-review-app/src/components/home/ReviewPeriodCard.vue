<template>
<view class="period-card">
  <image :src="icon" mode="widthFix"/>
  <text class="title">{{title}}</text>
  <text class="desc">{{desc}}</text>
</view>
</template>
<script setup lang="ts">
defineProps<{title:string,desc:string,icon:string}>()
</script>
<style scoped>
.period-card{height:220rpx;flex:1;background:#fff;border-radius:30rpx;display:flex;flex-direction:column;align-items:center;justify-content:center}
image{width:60rpx}.title{font-size:30rpx;font-weight:700;margin-top:10rpx}.desc{font-size:22rpx;color:#8994a8;margin-top:8rpx}
</style>