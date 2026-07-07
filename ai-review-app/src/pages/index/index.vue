<script setup lang="ts">
const startVoiceReview = () => {
  console.log('voice review')
}

const startChatReview = () => {
  console.log('chat review')
}
</script>

<template>
  <view class="page">
    <view class="header">
      <text class="title">AI复盘</text>
      <text class="subtitle">像聊天一样复盘，像教练一样总结</text>
    </view>

    <view class="actions">
      <view class="card voice" @click="startVoiceReview">
        <text class="icon">🎙</text>
        <text class="name">开始语音复盘</text>
        <text class="desc">说给我听，我来整理</text>
      </view>

      <view class="card chat" @click="startChatReview">
        <text class="icon">💬</text>
        <text class="name">开始对话复盘</text>
        <text class="desc">聊一聊，理清思路</text>
      </view>
    </view>

    <view class="section">
      <text class="section-title">选择复盘周期</text>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 60rpx 40rpx;
}
.title {
  font-size: 64rpx;
  font-weight: 700;
}
.subtitle {
  display: block;
  margin-top: 20rpx;
  color: #68758d;
}
.actions {
  display: flex;
  gap: 24rpx;
  margin-top: 60rpx;
}
.card {
  flex: 1;
  height: 420rpx;
  border-radius: 40rpx;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon {
  font-size: 100rpx;
}
.name {
  margin-top: 30rpx;
  font-size: 36rpx;
  font-weight: bold;
}
.desc {
  margin-top: 15rpx;
  color: #68758d;
}
</style>
