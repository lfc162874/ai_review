<template>
  <view class="tabbar">
    <view v-for="item in items" :key="item.name" :class="['item', item.active ? 'active' : '']">
      <view class="icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g v-if="item.key === 'home'">
            <path d="M20 8l12 9v14a3 3 0 01-3 3H11a3 3 0 01-3-3V17l12-9z" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round"/>
            <path d="M14 24v10h12V24" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </g>
          <g v-else-if="item.key === 'review'">
            <rect x="6" y="6" width="28" height="28" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
            <path d="M13 20l6 6 10-12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <g v-else-if="item.key === 'archive'">
            <path d="M6 10h28v20a3 3 0 01-3 3H9a3 3 0 01-3-3V10z" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round"/>
            <path d="M6 10l6-5h16l6 5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M15 18h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          </g>
          <g v-else>
            <circle cx="20" cy="14" r="7" stroke="currentColor" stroke-width="3" fill="none"/>
            <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
          </g>
        </svg>
      </view>
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const items = [
  { name: '首页', key: 'home', active: true },
  { name: '复盘', key: 'review' },
  { name: '档案', key: 'archive' },
  { name: '我的', key: 'profile' },
]
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 140rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20rpx);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 40rpx 40rpx 0 0;
  box-shadow: 0 -4rpx 20rpx rgba(50, 80, 120, 0.06);
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8994a8;
  font-size: 24rpx;
}
.icon {
  width: 40rpx;
  height: 40rpx;
  margin-bottom: 8rpx;
}
.icon svg {
  width: 40rpx;
  height: 40rpx;
}
.active {
  color: #3788ff;
}
</style>
