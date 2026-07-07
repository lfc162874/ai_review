<template>
  <view class="item">
    <view class="icon" :style="{ background: iconBg }">
      <svg v-if="type === 'voice'" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="8" width="12" height="18" rx="6" fill="white"/>
        <path d="M10 20c0 5.523 4.477 10 10 10s10-4.477 10-10M20 30v4" stroke="white" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <svg v-else width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 14c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4h-8l-6 4v-4h-2c-2.21 0-4-1.79-4-4V14z" fill="white"/>
        <circle cx="17" cy="20" r="2" fill="#3B86FF"/>
        <circle cx="23" cy="20" r="2" fill="#3B86FF"/>
      </svg>
    </view>
    <view class="content">
      <text class="title">{{ title }}</text>
      <text class="meta">{{ meta }}</text>
    </view>
    <view class="tag">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8" stroke="#22B573" stroke-width="2" stroke-linecap="round"/>
        <path d="M6 10l3 3 5-6" stroke="#22B573" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <text>已生成总结</text>
    </view>
    <view class="arrow">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6l6 6-6 6" stroke="#c5cbd6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ title: string; meta: string; type: 'voice' | 'chat' }>()

const iconBg = computed(() => {
  return props.type === 'voice'
    ? 'linear-gradient(135deg, #3cd08f, #22b573)'
    : 'linear-gradient(135deg, #5c9aff, #3b86ff)'
})
</script>

<style scoped>
.item {
  background: #fff;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  padding: 26rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(50, 80, 120, 0.05);
}
.icon {
  width: 84rpx;
  height: 84rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 22rpx;
  flex-shrink: 0;
}
.icon svg {
  width: 40rpx;
  height: 40rpx;
}
.content {
  flex: 1;
  min-width: 0;
}
.title {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  color: #14223a;
}
.meta {
  display: block;
  color: #8994a8;
  margin-top: 8rpx;
  font-size: 26rpx;
}
.tag {
  display: flex;
  align-items: center;
  background: #e8f9f1;
  color: #22b573;
  font-size: 24rpx;
  padding: 8rpx 14rpx;
  border-radius: 20rpx;
  margin-right: 8rpx;
  flex-shrink: 0;
}
.tag svg {
  width: 20rpx;
  height: 20rpx;
  margin-right: 6rpx;
}
.arrow {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.arrow svg {
  width: 24rpx;
  height: 24rpx;
}
</style>
