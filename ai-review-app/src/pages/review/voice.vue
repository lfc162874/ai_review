<script setup lang="ts">
import { computed, onMounted } from 'vue'
import HomeTabBar from '@/components/home/HomeTabBar.vue'
import VoiceCircle from '@/components/review/VoiceCircle.vue'
import TranscriptCard from '@/components/review/TranscriptCard.vue'
import InsightCard from '@/components/review/InsightCard.vue'
import FinishButton from '@/components/review/FinishButton.vue'
import { useReviewStore } from '@/stores/review'
import { startRecord } from '@/services/voice'

const reviewStore = useReviewStore()
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
</script>

<template>
  <view class="page">
    <view class="bg" />

    <view class="header">
      <text class="title">语音复盘中 ✦</text>
      <text class="sub">边说边记，AI 正在帮你整理</text>
    </view>

    <view class="voice-area">
      <VoiceCircle />
      <view class="wave">•• ▂▅▇▅▂ ••</view>
      <text class="listen">{{ statusText }}</text>
    </view>

    <TranscriptCard>
      <text class="content">{{ reviewStore.transcript || '等待你的分享，AI 会实时整理你的复盘内容...' }}</text>
    </TranscriptCard>

    <InsightCard />

    <FinishButton />

    <HomeTabBar />
  </view>
</template>

<style scoped>
.page{min-height:100vh;background:#f8fbff;padding:70rpx 40rpx 180rpx}.bg{position:absolute;top:0;left:0;right:0;height:400rpx;background:linear-gradient(#edf7ff,#fff)}.header{position:relative}.title{font-size:58rpx;font-weight:800}.sub{display:block;margin-top:18rpx;color:#68758d;font-size:30rpx}.voice-area{text-align:center;margin-top:70rpx}.wave{color:#76b1ff;font-size:55rpx;margin-top:30rpx}.listen{display:block;margin-top:20rpx;color:#68758d}.content{font-size:32rpx;line-height:1.8}
</style>
