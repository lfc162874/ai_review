<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { userApi } from '@/api/user'
import { reviewApi } from '@/api/review'
import type { Review } from '@/api/review'
import HomeHeader from '@/components/home/HomeHeader.vue'
import ReviewModeCard from '@/components/home/ReviewModeCard.vue'
import ReviewPeriodCard from '@/components/home/ReviewPeriodCard.vue'
import RecentReviewItem from '@/components/home/RecentReviewItem.vue'
import HomeTabBar from '@/components/home/HomeTabBar.vue'

const userStore = useUserStore()
const recentReviews = ref<Review[]>([])

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

onMounted(async () => {
  // 获取用户信息
  if (!userStore.userInfo) {
    try {
      const res = await userApi.getMe()
      userStore.setUserInfo(res.data)
    } catch {
      // 获取失败时保留空
    }
  }
  // 获取最近复盘
  try {
    const res = await reviewApi.list({ page: 1, pageSize: 5 })
    recentReviews.value = res.data.list
  } catch {
    // 失败时保留空列表
  }
})

const formatMeta = (r: Review) => {
  const date = new Date(r.createdAt).toLocaleDateString('zh-CN')
  const typeLabel = r.type === 'daily' ? '每日' : r.type === 'weekly' ? '每周' : r.type === 'monthly' ? '每月' : r.type === 'yearly' ? '年度' : '项目'
  return `${date} · ${typeLabel}`
}

const goToResult = (id: string) => {
  uni.navigateTo({ url: `/pages/review/result?id=${id}` })
}
</script>

<template>
  <view class="page">
    <view class="background" />
    <HomeHeader :nickname="userStore.userInfo?.nickname" />

    <view class="mode-list">
      <ReviewModeCard
        v-for="mode in modes"
        :key="mode.title"
        v-bind="mode"
      />
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
      <RecentReviewItem
        v-for="item in recentReviews"
        :key="item.id"
        :title="item.content.slice(0, 20)"
        :meta="formatMeta(item)"
        :type="item.type === 'daily' ? 'voice' : 'chat'"
        @click="goToResult(item.id)"
      />
      <text v-if="recentReviews.length === 0" class="empty">暂无复盘记录，快来开始第一次复盘吧</text>
    </view>

    <HomeTabBar active="home" />
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
.empty {
  display: block;
  text-align: center;
  color: #8994a8;
  font-size: 28rpx;
  padding: 40rpx 0;
}
</style>
