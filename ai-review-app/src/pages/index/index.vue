<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue'
import ReviewModeCard from '@/components/home/ReviewModeCard.vue'
import ReviewPeriodCard from '@/components/home/ReviewPeriodCard.vue'
import RecentReviewItem from '@/components/home/RecentReviewItem.vue'
import HomeTabBar from '@/components/home/HomeTabBar.vue'

const modes = [
  { title: '开始语音复盘', desc: '说给我听，我来整理', type: 'voice' as const },
  { title: '开始对话复盘', desc: '聊一聊，理清思路', type: 'chat' as const },
]

const periods = [
  { title: '本周', desc: '回顾这一周\n的得与失', type: 'week' as const },
  { title: '本月', desc: '总结这个月\n的成长', type: 'month' as const },
  { title: '年度', desc: '复盘今年\n的关键进展', type: 'year' as const },
  { title: '项目阶段', desc: '梳理阶段目标\n与结果', type: 'project' as const },
]

const recent = [
  { title: '7月周复盘', meta: '2024.07.14 · 语音 · 6 分钟', type: 'voice' as const },
  { title: '投标项目阶段复盘', meta: '2024.07.10 · 对话 · 12 分钟', type: 'chat' as const },
]
</script>

<template>
  <view class="page">
    <view class="background" />
    <HomeHeader />

    <view class="mode-list">
      <ReviewModeCard v-for="mode in modes" :key="mode.title" v-bind="mode" />
    </view>

    <view class="section-title">
      <text>选择复盘周期</text>
      <text class="more">了解更多 ＞</text>
    </view>
    <view class="period-list">
      <ReviewPeriodCard v-for="item in periods" :key="item.title" v-bind="item" />
    </view>

    <view class="section-title">
      <text>最近一次复盘</text>
      <text class="more">全部 ＞</text>
    </view>
    <view class="recent-list">
      <RecentReviewItem v-for="item in recent" :key="item.title" v-bind="item" />
    </view>

    <HomeTabBar />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f8fbff;
  padding: 0 40rpx 180rpx;
  position: relative;
}
.background {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 420rpx;
  background: linear-gradient(180deg, #eaf5ff, #f8fbff);
  z-index: 0;
}
.mode-list,
.section-title,
.period-list,
.recent-list {
  position: relative;
  z-index: 1;
}
.mode-list {
  display: flex;
  gap: 24rpx;
  margin-top: 56rpx;
}
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 52rpx;
  font-size: 34rpx;
  font-weight: 700;
  color: #14223a;
}
.section-title .more {
  font-size: 26rpx;
  color: #8994a8;
  font-weight: 400;
}
.period-list {
  display: flex;
  gap: 20rpx;
  margin-top: 24rpx;
}
.recent-list {
  margin-top: 24rpx;
}
</style>
