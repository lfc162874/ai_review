<template>
  <view class="card">
    <view class="header">
      <image class="icon" src="/static/icons/review/note_icon.svg" mode="widthFix" />
      <text class="title">实时转写</text>
      <view class="status">
        <image class="dot" src="/static/icons/review/status_dot.svg" mode="widthFix" />
        <text>识别中</text>
      </view>
    </view>
    <view class="content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
// 无逻辑
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 36rpx;
  padding: 28rpx;
  box-shadow: 0 10rpx 30rpx rgba(50, 80, 120, 0.06);
  margin-top: 30rpx;
  position: relative;
  z-index: 1;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.icon {
  width: 44rpx;
  height: 44rpx;
  margin-right: 14rpx;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
  color: #14223a;
  flex: 1;
}

.status {
  display: flex;
  align-items: center;
  color: #3788ff;
  font-size: 24rpx;
}

.dot {
  width: 20rpx;
  height: 20rpx;
  margin-right: 6rpx;
}

.content {
  font-size: 30rpx;
  line-height: 1.7;
  color: #14223a;
}
</style>
