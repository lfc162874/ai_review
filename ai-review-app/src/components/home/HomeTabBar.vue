<template>
  <view class="tabbar">
    <view v-for="item in items" :key="item.name" :class="['item', item.active ? 'active' : '']">
      <image class="icon" :src="item.icon" mode="widthFix" />
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const items = [
  { name: '首页', active: true, icon: '/static/icons/home.svg' },
  { name: '复盘', icon: '/static/icons/review.svg' },
  { name: '档案', icon: '/static/icons/archive.svg' },
  { name: '我的', icon: '/static/icons/user.svg' }
]
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: 24rpx;
  height: 132rpx;
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(30rpx);
  border-radius: 44rpx;
  display:flex;
  justify-content:space-around;
  align-items:center;
  box-shadow:0 10rpx 40rpx rgba(30,60,100,.12);
}
.item {
  display:flex;
  flex-direction:column;
  align-items:center;
  color:#8994a8;
  font-size:24rpx;
}
.icon {
  width:48rpx;
  height:48rpx;
  margin-bottom:8rpx;
}
.active {
  color:#3788ff;
  font-weight:600;
}
</style>
