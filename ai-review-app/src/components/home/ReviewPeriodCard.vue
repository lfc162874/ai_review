<template>
  <view class="period-card">
    <view class="icon-box" :style="{ background: iconBg }">
      <svg v-if="type === 'week'" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14h32v28H8V14z" fill="white"/>
        <path d="M12 22h24M16 12V8M32 12V8" stroke="#22B573" stroke-width="3" stroke-linecap="round"/>
        <rect x="20" y="28" width="8" height="8" rx="2" fill="#22B573"/>
      </svg>
      <svg v-else-if="type === 'month'" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14h32v28H8V14z" fill="white"/>
        <path d="M12 22h24M16 12V8M32 12V8" stroke="#3B86FF" stroke-width="3" stroke-linecap="round"/>
        <text x="24" y="38" text-anchor="middle" fill="#3B86FF" font-size="14" font-weight="bold">30</text>
      </svg>
      <svg v-else-if="type === 'year'" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="16" fill="white"/>
        <path d="M24 12c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12" stroke="#8B5CF6" stroke-width="6" stroke-linecap="round"/>
      </svg>
      <svg v-else width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 38V22l10-6 10 6v16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="24" cy="14" r="4" fill="white"/>
      </svg>
    </view>
    <text class="title">{{ title }}</text>
    <text class="desc">{{ desc }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ title: string; desc: string; type: 'week' | 'month' | 'year' | 'project' }>()

const iconBg = computed(() => {
  const map: Record<string, string> = {
    week: 'linear-gradient(135deg, #3cd08f, #22b573)',
    month: 'linear-gradient(135deg, #5c9aff, #3b86ff)',
    year: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    project: 'linear-gradient(135deg, #ffb347, #ff9f43)',
  }
  return map[props.type]
})
</script>

<style scoped>
.period-card {
  flex: 1;
  height: 220rpx;
  background: #fff;
  border-radius: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6rpx 20rpx rgba(50, 80, 120, 0.06);
}
.icon-box {
  width: 84rpx;
  height: 84rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}
.icon-box svg {
  width: 48rpx;
  height: 48rpx;
}
.title {
  font-size: 30rpx;
  font-weight: 700;
  color: #14223a;
}
.desc {
  font-size: 22rpx;
  color: #8994a8;
  margin-top: 8rpx;
  text-align: center;
  padding: 0 10rpx;
}
</style>
