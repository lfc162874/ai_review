<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reviewApi } from '@/api/review'
import type { Review, ReviewSummary } from '@/api/review'

const review = ref<Review | null>(null)
const summary = ref<ReviewSummary | null>(null)
const loading = ref(true)

onMounted(async () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const id = currentPage?.options?.id || currentPage?.$page?.options?.id
  if (!id) {
    uni.showToast({ title: '缺少复盘ID', icon: 'none' })
    return
  }
  try {
    const res = await reviewApi.detail(id)
    review.value = res.data
    summary.value = res.data.summary
  } catch {
    uni.showToast({ title: '加载失败', icon: 'none' })
  } finally {
    loading.value = false
  }
})

const goHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<template>
  <view class="page">
    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>

    <template v-else-if="review">
      <view class="header">
        <text class="title">复盘总结</text>
        <text class="sub">AI 已帮你整理本次成长记录</text>
      </view>

      <view class="card">
        <text class="label">本次回顾</text>
        <text class="content-text">{{ review.content }}</text>
      </view>

      <view v-if="summary" class="card">
        <text class="label">综合概述</text>
        <text class="content-text">{{ summary.overview }}</text>
      </view>

      <view v-if="summary && summary.achievements.length" class="card">
        <text class="label">关键成果</text>
        <view class="tags">
          <view v-for="(a, i) in summary.achievements" :key="i" class="tag">{{ a }}</view>
        </view>
      </view>

      <view v-if="summary && summary.problems.length" class="card">
        <text class="label">主要问题</text>
        <view class="tags">
          <view v-for="(p, i) in summary.problems" :key="i" class="tag tag-orange">{{ p }}</view>
        </view>
      </view>

      <view v-if="summary && summary.analysis" class="card">
        <text class="label">深度分析</text>
        <text class="content-text">{{ summary.analysis }}</text>
      </view>

      <view v-if="summary && summary.growth" class="card">
        <text class="label">成长收获</text>
        <text class="content-text">{{ summary.growth }}</text>
      </view>

      <view v-if="summary && summary.nextSteps.length" class="card">
        <text class="label">下一步行动</text>
        <view class="steps">
          <view v-for="(s, i) in summary.nextSteps" :key="i" class="step">
            <text class="step-num">{{ i + 1 }}</text>
            <text class="step-text">{{ s }}</text>
          </view>
        </view>
      </view>

      <view class="actions">
        <button class="btn-primary" @click="goHome">返回首页</button>
      </view>
    </template>

    <view v-else class="loading">
      <text>暂无数据</text>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f8fbff;
  padding: 70rpx 40rpx 60rpx;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  color: #8994a8;
  font-size: 30rpx;
}

.header {
  margin-bottom: 10rpx;
}

.title {
  font-size: 60rpx;
  font-weight: 800;
  color: #14223a;
  display: block;
}

.sub {
  display: block;
  color: #718096;
  margin-top: 15rpx;
  font-size: 28rpx;
}

.card {
  background: #fff;
  border-radius: 36rpx;
  padding: 35rpx;
  margin-top: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(50, 80, 120, 0.08);
}

.label {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  color: #14223a;
  margin-bottom: 20rpx;
}

.content-text {
  font-size: 30rpx;
  line-height: 1.7;
  color: #14223a;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag {
  display: inline-block;
  background: #edf5ff;
  color: #3788ff;
  padding: 15rpx 25rpx;
  border-radius: 30rpx;
  font-size: 28rpx;
}

.tag-orange {
  background: #fff5e8;
  color: #ff9f43;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.step-num {
  width: 44rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  background: #3788ff;
  color: #fff;
  border-radius: 50%;
  font-size: 26rpx;
  font-weight: 700;
  flex-shrink: 0;
}

.step-text {
  font-size: 30rpx;
  line-height: 1.6;
  color: #14223a;
  padding-top: 6rpx;
}

.actions {
  margin-top: 50rpx;
}

.btn-primary {
  background: #3788ff;
  color: #fff;
  border-radius: 44rpx;
  font-size: 34rpx;
  font-weight: 700;
  height: 96rpx;
  line-height: 96rpx;
  border: none;
}
</style>
<template>
<view class="page">
  <view class="header">
    <text class="title">复盘总结</text>
    <text class="sub">AI 已帮你整理本次成长记录</text>
  </view>

  <view class="card"><text class="label">本次回顾</text><text>完成了一周项目推进与问题梳理，明确下一阶段优化方向。</text></view>

  <view class="card"><text class="label">关键成果</text><view class="tag">权限中心重构</view><view class="tag">项目推进</view></view>

  <view class="card"><text class="label">AI建议</text><text>建议提前进行需求确认，减少后期反复调整。</text></view>

  <button>保存到档案</button>
</view>
</template>

<style scoped>
.page{min-height:100vh;background:#f8fbff;padding:70rpx 40rpx}.title{font-size:60rpx;font-weight:800}.sub{display:block;color:#718096;margin-top:15rpx}.card{background:#fff;border-radius:36rpx;padding:35rpx;margin-top:30rpx;box-shadow:0 10rpx 30rpx rgba(50,80,120,.08)}.label{display:block;font-size:34rpx;font-weight:700;margin-bottom:20rpx}.tag{display:inline-block;background:#edf5ff;padding:15rpx 25rpx;border-radius:30rpx;margin-right:15rpx}button{margin-top:40rpx;background:#3788ff;color:#fff;border-radius:40rpx}
</style>
