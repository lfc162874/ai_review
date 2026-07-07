<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue'
import ReviewModeCard from '@/components/home/ReviewModeCard.vue'
import ReviewPeriodCard from '@/components/home/ReviewPeriodCard.vue'
import RecentReviewItem from '@/components/home/RecentReviewItem.vue'
import HomeTabBar from '@/components/home/HomeTabBar.vue'

const periods = [
  {title:'本周',desc:'回顾这一周的得与失',icon:'/static/icons/calendar.svg'},
  {title:'本月',desc:'总结这个月的成长',icon:'/static/icons/calendar.svg'},
  {title:'年度',desc:'复盘今年的关键进展',icon:'/static/icons/chart.svg'},
  {title:'项目阶段',desc:'梳理阶段目标与结果',icon:'/static/icons/project.svg'}
]

const recent = [
 {title:'7月周复盘',meta:'2024.07.14 · 语音 · 6分钟',icon:'🎙'},
 {title:'投标项目阶段复盘',meta:'2024.07.10 · 对话 · 12分钟',icon:'💬'}
]
</script>

<template>
  <view class="page">
    <view class="background" />
    <HomeHeader />

    <view class="mode-list">
      <ReviewModeCard title="开始语音复盘" desc="说给我听，我来整理" icon="/static/icons/voice.svg" />
      <ReviewModeCard title="开始对话复盘" desc="聊一聊，理清思路" icon="/static/icons/chat.svg" />
    </view>

    <view class="title-row"><text>选择复盘周期</text><text>了解更多 ＞</text></view>
    <view class="period-list">
      <ReviewPeriodCard v-for="item in periods" :key="item.title" v-bind="item" />
    </view>

    <view class="title-row"><text>最近一次复盘</text><text>全部 ＞</text></view>
    <RecentReviewItem v-for="item in recent" :key="item.title" v-bind="item" />

    <HomeTabBar />
  </view>
</template>

<style scoped>
.page{min-height:100vh;background:#f8fbff;padding:0 40rpx 180rpx;position:relative}
.background{position:absolute;left:0;right:0;top:0;height:420rpx;background:linear-gradient(180deg,#eaf5ff,#f8fbff);z-index:0}
.mode-list,.title-row,.period-list{position:relative;z-index:1}
.mode-list{display:flex;gap:24rpx;margin-top:70rpx}
.title-row{display:flex;justify-content:space-between;margin-top:50rpx;font-size:34rpx;font-weight:700}
.title-row text:last-child{font-size:26rpx;color:#8994a8;font-weight:400}
.period-list{display:flex;gap:20rpx;margin-top:25rpx}
</style>
