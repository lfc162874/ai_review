<script setup lang="ts">
import HomeTabBar from '@/components/home/HomeTabBar.vue'
</script>

<template>
<view class="page">
  <view class="bg"></view>
  <view class="header">
    <text class="title">语音复盘中 ✦</text>
    <text class="sub">边说边记，AI 正在帮你整理</text>
  </view>

  <view class="wave-area">
    <view class="circle">
      <image src="/static/icons/voice.svg" />
    </view>
    <view class="wave">•• ▂▅▇▅▂ ••</view>
    <text class="listen">正在聆听...</text>
  </view>

  <view class="card transcript">
    <view class="card-title">▣ 实时转写 <text>● 识别中</text></view>
    <text>这周主要还是在做权限中心重构，中间需求反复改了几次，团队沟通成本有点高，后面我打算在需求评审时多拉业务和测试一起过一遍……</text>
  </view>

  <view class="card insight">
    <view class="card-title">✦ AI 实时提炼</view>
    <view class="tags">
      <view><b>🎯 关键成果</b><text>权限中心重构<br/>第一版上线</text></view>
      <view><b>⚠ 主要问题</b><text>需求多次变更<br/>沟通成本高</text></view>
      <view><b>？ 待深入追问</b><text>如何减少需求<br/>反复修改？</text></view>
    </view>
  </view>

  <button class="finish">结束并生成总结</button>
  <HomeTabBar />
</view>
</template>

<style scoped>
.page{min-height:100vh;background:#f8fbff;padding:70rpx 40rpx 180rpx}.bg{position:absolute;top:0;left:0;right:0;height:400rpx;background:linear-gradient(#edf7ff,#fff)}.header{position:relative}.title{font-size:58rpx;font-weight:800}.sub{display:block;margin-top:18rpx;color:#68758d;font-size:30rpx}.wave-area{text-align:center;margin-top:70rpx}.circle{margin:auto;width:280rpx;height:280rpx;border-radius:50%;background:#3788ff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 60rpx #9dc9ff}.circle image{width:130rpx}.wave{color:#76b1ff;font-size:55rpx;margin-top:30rpx}.listen{display:block;margin-top:20rpx;color:#68758d}.card{background:#fff;border-radius:36rpx;padding:35rpx;margin-top:35rpx;box-shadow:0 10rpx 30rpx rgba(50,80,120,.08)}.card-title{font-size:36rpx;font-weight:700;margin-bottom:25rpx}.card-title text{float:right;color:#3788ff;font-size:26rpx}.transcript text{font-size:32rpx;line-height:1.8}.tags{display:flex;gap:15rpx}.tags view{flex:1;background:#f5f8ff;border-radius:25rpx;padding:20rpx}.tags b{display:block}.tags text{display:block;margin-top:15rpx;font-size:24rpx}.finish{margin-top:35rpx;background:#3788ff;color:white;border-radius:40rpx;height:100rpx;line-height:100rpx}
</style>