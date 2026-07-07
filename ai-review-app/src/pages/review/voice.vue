<script setup lang="ts">
import HomeTabBar from '@/components/home/HomeTabBar.vue'
import VoiceCircle from '@/components/review/VoiceCircle.vue'
import TranscriptCard from '@/components/review/TranscriptCard.vue'
import InsightCard from '@/components/review/InsightCard.vue'
import FinishButton from '@/components/review/FinishButton.vue'
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
      <text class="listen">正在聆听...</text>
    </view>

    <TranscriptCard>
      <text class="content">这周主要还是在做权限中心重构，中间需求反复改了几次，团队沟通成本有点高，后面我打算在需求评审时多拉业务和测试一起过一遍……</text>
    </TranscriptCard>

    <InsightCard />

    <FinishButton />

    <HomeTabBar />
  </view>
</template>

<style scoped>
.page{min-height:100vh;background:#f8fbff;padding:70rpx 40rpx 180rpx}.bg{position:absolute;top:0;left:0;right:0;height:400rpx;background:linear-gradient(#edf7ff,#fff)}.header{position:relative}.title{font-size:58rpx;font-weight:800}.sub{display:block;margin-top:18rpx;color:#68758d;font-size:30rpx}.voice-area{text-align:center;margin-top:70rpx}.wave{color:#76b1ff;font-size:55rpx;margin-top:30rpx}.listen{display:block;margin-top:20rpx;color:#68758d}.content{font-size:32rpx;line-height:1.8}
</style>
