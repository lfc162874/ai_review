<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import HomeTabBar from '@/components/home/HomeTabBar.vue'
import VoiceCircle from '@/components/review/VoiceCircle.vue'
import TranscriptCard from '@/components/review/TranscriptCard.vue'
import InsightCard from '@/components/review/InsightCard.vue'
import FinishButton from '@/components/review/FinishButton.vue'
import { useReviewStore } from '@/stores/review'
import { startRecord, stopRecord } from '@/services/voice'
import { reviewApi } from '@/api/review'

const reviewStore = useReviewStore()
const submitting = ref(false)

const statusText = computed(() => {
  const map = {
    idle: '准备开始复盘...',
    listening: '正在聆听...',
    transcribing: 'AI正在整理...',
    completed: '复盘完成'
  }
  return map[reviewStore.status]
})

onMounted(() => {
  reviewStore.startVoice()
  startRecord({
    onText(text) {
      reviewStore.updateTranscript(text)
    },
    onStatus(status) {
      if (status === 'listening') {
        reviewStore.startVoice()
      }
    }
  })
})

const handleFinish = async () => {
  if (submitting.value) return
  if (!reviewStore.transcript.trim()) {
    uni.showToast({ title: '请先说点什么再结束', icon: 'none' })
    return
  }
  submitting.value = true
  try {
    await stopRecord()
    // 创建复盘记录
    const createRes = await reviewApi.create({
      type: 'daily',
      content: reviewStore.transcript,
    })
    const reviewId = createRes.data.id
    // 触发 AI 生成总结
    await reviewApi.generate(reviewId)
    reviewStore.complete()
    uni.redirectTo({ url: `/pages/review/result?id=${reviewId}` })
  } catch (e: any) {
    uni.showToast({ title: '生成失败，请重试', icon: 'none' })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <view class="page">
    <view class="bg" />

    <view class="header">
      <view class="title-wrap">
        <text class="title">语音复盘中</text>
        <image class="sparkle" src="/static/icons/sparkles.svg" mode="widthFix" />
      </view>
      <text class="sub">边说边记，AI 正在帮你整理</text>
    </view>

    <view class="voice-area">
      <VoiceCircle />
      <view class="wave">•• ▂▅▇▅▂ ••</view>
      <text class="listen">{{ statusText }}</text>
    </view>

    <TranscriptCard>
      <text class="transcript-text">{{ reviewStore.transcript || '等待你的分享，AI 会实时整理你的复盘内容...' }}</text>
    </TranscriptCard>

    <InsightCard />

    <FinishButton @finish="handleFinish" :disabled="submitting" />

    <HomeTabBar active="review" />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f8fbff;
  padding: 60rpx 40rpx 200rpx;
  position: relative;
  overflow: hidden;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 480rpx;
  background: linear-gradient(180deg, #eaf5ff 0%, #f8fbff 100%);
  z-index: 0;
}
.header {
  position: relative;
  z-index: 1;
}
.title-wrap {
  display: flex;
  align-items: flex-start;
}
.title {
  font-size: 56rpx;
  font-weight: 800;
  color: #14223a;
  line-height: 1;
}
.sparkle {
  width: 44rpx;
  height: 44rpx;
  margin-left: 10rpx;
  margin-top: -6rpx;
}
.sub {
  display: block;
  margin-top: 14rpx;
  color: #68758d;
  font-size: 28rpx;
}
.voice-area {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 30rpx;
}
.wave {
  color: #76b1ff;
  font-size: 48rpx;
  margin-top: 20rpx;
  text-align: center;
}
.listen {
  display: block;
  margin-top: 10rpx;
  color: #68758d;
  font-size: 30rpx;
}
.transcript-text {
  font-size: 30rpx;
  line-height: 1.7;
  color: #14223a;
}
</style>
