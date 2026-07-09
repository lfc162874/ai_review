<script setup lang="ts">
defineProps<{ nickname?: string }>()
</script>

<template>
  <view class="header">
    <view class="top">
      <view class="title-wrap">
        <text class="title">{{ nickname ? `${nickname}，你好` : 'AI复盘' }}</text>
        <view class="sparkle">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2C18.5 10.5 24.5 16 33 17C24.5 18 18.5 23.5 18 33C17.5 23.5 11.5 18 3 17C11.5 16 17.5 10.5 18 2Z" fill="#3B86FF"/>
            <path d="M30 8L31.5 11L34.5 11.5L32 14L32.5 17.5L30 15.5L27.5 17.5L28 14L25.5 11.5L28.5 11L30 8Z" fill="#3B86FF"/>
          </svg>
        </view>
      </view>
    </view>
    <text class="desc">像聊天一样复盘，像教练一样总结</text>
  </view>
</template>

<style scoped>
.header {
  padding-top: 60rpx;
  position: relative;
  z-index: 1;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.title-wrap {
  display: flex;
  align-items: flex-start;
}
.title {
  font-size: 64rpx;
  font-weight: 800;
  color: #14223a;
  line-height: 1;
}
.sparkle {
  margin-left: 12rpx;
  margin-top: -8rpx;
  width: 36rpx;
  height: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sparkle svg {
  width: 36rpx;
  height: 36rpx;
}
.desc {
  display: block;
  margin-top: 18rpx;
  color: #68758d;
  font-size: 30rpx;
}
</style>
