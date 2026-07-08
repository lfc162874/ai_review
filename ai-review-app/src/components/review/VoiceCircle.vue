<template>
  <view class="voice-circle-wrap">
    <!-- 左侧声波 -->
    <view class="wave wave-left">
      <view v-for="i in 7" :key="`l-${i}`" class="bar" :style="{ animationDelay: `${i * 0.08}s` }" />
    </view>

    <!-- 中央麦克风 -->
    <view class="voice-circle">
      <view class="pulse pulse-one" />
      <view class="pulse pulse-two" />
      <image class="mic" src="/static/icons/review/mic_main.svg" mode="widthFix" />
    </view>

    <!-- 右侧声波 -->
    <view class="wave wave-right">
      <view v-for="i in 7" :key="`r-${i}`" class="bar" :style="{ animationDelay: `${i * 0.08}s` }" />
    </view>
  </view>
</template>

<script setup lang="ts">
// 静态展示组件，无逻辑
</script>

<style scoped>
.voice-circle-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30rpx;
}

.voice-circle {
  width: 240rpx;
  height: 240rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #6db5ff, #3788ff);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 60rpx rgba(55, 136, 255, 0.35);
}

.mic {
  width: 110rpx;
  height: 110rpx;
  z-index: 3;
}

.pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 16rpx solid rgba(55, 136, 255, 0.15);
}

.pulse-one {
  animation: pulse 2s infinite;
}

.pulse-two {
  animation: pulse 2s 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* 声波 */
.wave {
  display: flex;
  align-items: center;
  gap: 8rpx;
  height: 100rpx;
}

.wave-left {
  flex-direction: row;
}

.wave-right {
  flex-direction: row-reverse;
}

.bar {
  width: 6rpx;
  background: #3788ff;
  border-radius: 4rpx;
  opacity: 0.6;
  animation: soundBar 1s ease-in-out infinite;
}

/* 7 根柱子，不同高度 */
.wave-left .bar:nth-child(1) { height: 30%; }
.wave-left .bar:nth-child(2) { height: 55%; }
.wave-left .bar:nth-child(3) { height: 80%; }
.wave-left .bar:nth-child(4) { height: 100%; }
.wave-left .bar:nth-child(5) { height: 70%; }
.wave-left .bar:nth-child(6) { height: 45%; }
.wave-left .bar:nth-child(7) { height: 25%; }

.wave-right .bar:nth-child(1) { height: 25%; }
.wave-right .bar:nth-child(2) { height: 45%; }
.wave-right .bar:nth-child(3) { height: 70%; }
.wave-right .bar:nth-child(4) { height: 100%; }
.wave-right .bar:nth-child(5) { height: 80%; }
.wave-right .bar:nth-child(6) { height: 55%; }
.wave-right .bar:nth-child(7) { height: 30%; }

@keyframes soundBar {
  0%, 100% {
    transform: scaleY(1);
    opacity: 0.6;
  }
  50% {
    transform: scaleY(0.6);
    opacity: 0.3;
  }
}
</style>
