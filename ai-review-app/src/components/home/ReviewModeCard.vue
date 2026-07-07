<template>
  <view :class="['card', type]">
    <view class="icon-bg">
      <svg v-if="type === 'voice'" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="60" fill="white" fill-opacity="0.35"/>
        <path d="M60 28c11.046 0 20 8.954 20 20v14c0 11.046-8.954 20-20 20s-20-8.954-20-20V48c0-11.046 8.954-20 20-20z" stroke="white" stroke-width="6"/>
        <path d="M40 62c0 11.046 8.954 20 20 20s20-8.954 20-20M60 82v16" stroke="white" stroke-width="6" stroke-linecap="round"/>
      </svg>
      <svg v-else width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="60" fill="white" fill-opacity="0.35"/>
        <path d="M28 38c0-5.523 4.477-10 10-10h44c5.523 0 10 4.477 10 10v40c0 5.523-4.477 10-10 10H50l-18 12v-12h-6c-5.523 0-10-4.477-10-10V38z" fill="white"/>
        <circle cx="46" cy="58" r="5" fill="#3B86FF"/>
        <circle cx="60" cy="58" r="5" fill="#3B86FF"/>
        <circle cx="74" cy="58" r="5" fill="#3B86FF"/>
      </svg>
    </view>
    <text class="card-title">{{ title }}</text>
    <text class="card-desc">{{ desc }}</text>
    <view class="arrow">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 14h16M16 8l6 6-6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{ title: string; desc: string; type: 'voice' | 'chat' }>()
</script>

<style scoped>
.card {
  flex: 1;
  height: 480rpx;
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60rpx;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10rpx 30rpx rgba(50, 80, 120, 0.08);
}
.voice {
  background: linear-gradient(180deg, #e8f9f1 0%, #d1f4e2 100%);
}
.chat {
  background: linear-gradient(180deg, #eef4ff 0%, #d6e4ff 100%);
}
.icon-bg {
  width: 180rpx;
  height: 180rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}
.voice .icon-bg {
  background: linear-gradient(135deg, #3cd08f, #22b573);
  box-shadow: 0 16rpx 40rpx rgba(34, 181, 115, 0.25);
}
.chat .icon-bg {
  background: linear-gradient(135deg, #5c9aff, #3b86ff);
  box-shadow: 0 16rpx 40rpx rgba(59, 134, 255, 0.25);
}
.icon-bg svg {
  width: 120rpx;
  height: 120rpx;
}
.card-title {
  font-size: 38rpx;
  font-weight: 700;
  color: #14223a;
}
.card-desc {
  margin-top: 14rpx;
  font-size: 26rpx;
  color: #68758d;
}
.arrow {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 8rpx 20rpx rgba(50, 80, 120, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36rpx;
  color: #14223a;
}
.arrow svg {
  width: 28rpx;
  height: 28rpx;
}
</style>
