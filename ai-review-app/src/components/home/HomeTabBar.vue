<template>
<view class="tabbar">
  <view v-for="item in items" :key="item.name" :class="['item',item.active?'active':'']">
    <text class="icon">{{item.icon}}</text>
    <text>{{item.name}}</text>
  </view>
</view>
</template>
<script setup lang="ts">
const items=[
 {name:'首页',icon:'⌂',active:true},
 {name:'复盘',icon:'◫'},
 {name:'动态',icon:'○'},
 {name:'我的',icon:'♙'}
]
</script>
<style scoped>
.tabbar{position:fixed;left:0;right:0;bottom:0;height:140rpx;background:rgba(255,255,255,.85);backdrop-filter:blur(20rpx);display:flex;justify-content:space-around;align-items:center;border-radius:40rpx 40rpx 0 0}
.item{display:flex;flex-direction:column;align-items:center;color:#8994a8;font-size:24rpx}.icon{font-size:40rpx;margin-bottom:8rpx}.active{color:#3788ff}
</style>