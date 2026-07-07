<script setup lang="ts">
const reviewTypes = [
  { title: '本周', desc: '回顾这一周的得与失', icon: '▣', color: '#27c995' },
  { title: '本月', desc: '总结这个月的成长', icon: '30', color: '#3788ff' },
  { title: '年度', desc: '复盘今年的关键进展', icon: '◔', color: '#7857ff' },
  { title: '项目阶段', desc: '梳理阶段目标与结果', icon: '⚑', color: '#ff9d35' }
]

const recentReviews = [
  { title: '7月周复盘', meta: '2024.07.14 · 语音 · 6分钟', icon: '🎙' },
  { title: '投标项目阶段复盘', meta: '2024.07.10 · 对话 · 12分钟', icon: '💬' }
]
</script>

<template>
  <view class="page">
    <view class="top-bg" />

    <view class="header">
      <text class="title">AI复盘 ✦</text>
      <text class="subtitle">像聊天一样复盘，像教练一样总结</text>
      <view class="report-btn">⌁</view>
    </view>

    <view class="main-cards">
      <view class="main-card voice">
        <view class="circle">🎙</view>
        <text class="card-title">开始语音复盘</text>
        <text class="card-desc">说给我听，我来整理</text>
        <view class="arrow green">→</view>
      </view>

      <view class="main-card chat">
        <view class="circle">💬</view>
        <text class="card-title">开始对话复盘</text>
        <text class="card-desc">聊一聊，理清思路</text>
        <view class="arrow blue">→</view>
      </view>
    </view>

    <view class="section-title-row">
      <text>选择复盘周期</text>
      <text class="more">了解更多 ＞</text>
    </view>

    <view class="period-list">
      <view class="period" v-for="item in reviewTypes" :key="item.title">
        <text class="period-icon" :style="{color:item.color}">{{item.icon}}</text>
        <text class="period-title">{{item.title}}</text>
        <text class="period-desc">{{item.desc}}</text>
      </view>
    </view>

    <view class="section-title-row recent">
      <text>最近一次复盘</text>
      <text class="more">全部 ＞</text>
    </view>

    <view class="review-item" v-for="item in recentReviews" :key="item.title">
      <view class="review-icon">{{item.icon}}</view>
      <view class="review-content">
        <text class="review-title">{{item.title}}</text>
        <text class="review-meta">{{item.meta}}</text>
      </view>
      <view class="status">✓ 已生成总结</view>
      <text class="right">›</text>
    </view>

    <view class="tabbar">
      <view class="active">⌂<text>首页</text></view>
      <view>▤<text>复盘</text></view>
      <view>□<text>档案</text></view>
      <view>♙<text>我的</text></view>
    </view>
  </view>
</template>

<style scoped>
.page{min-height:100vh;background:#f8fbff;padding:70rpx 40rpx 180rpx;position:relative}
.top-bg{position:absolute;left:0;right:0;top:0;height:360rpx;background:linear-gradient(180deg,#eaf5ff,#f8fbff);z-index:0}
.header{position:relative;z-index:1}.title{font-size:64rpx;font-weight:800;color:#14223a}.subtitle{display:block;margin-top:18rpx;font-size:30rpx;color:#68758d}.report-btn{position:absolute;right:20rpx;top:40rpx;background:#fff;width:80rpx;height:80rpx;border-radius:24rpx;text-align:center;line-height:80rpx;font-size:42rpx}
.main-cards{display:flex;gap:24rpx;margin-top:70rpx}.main-card{height:500rpx;flex:1;background:#fff;border-radius:42rpx;display:flex;flex-direction:column;align-items:center;padding-top:70rpx;box-shadow:0 10rpx 30rpx rgba(50,80,120,.08)}.voice{background:linear-gradient(#effff8,#fff)}.chat{background:linear-gradient(#eff6ff,#fff)}.circle{font-size:100rpx}.card-title{margin-top:60rpx;font-size:38rpx;font-weight:700;color:#14223a}.card-desc{margin-top:20rpx;color:#68758d;font-size:28rpx}.arrow{margin-top:35rpx;background:#fff;border-radius:50%;width:80rpx;height:80rpx;text-align:center;line-height:80rpx;font-size:50rpx}.green{color:#21c994}.blue{color:#3788ff}
.section-title-row{display:flex;justify-content:space-between;margin-top:50rpx;font-size:34rpx;font-weight:700;color:#14223a}.more{font-size:28rpx;color:#8994a8;font-weight:400}.period-list{display:flex;gap:20rpx;margin-top:25rpx}.period{flex:1;background:#fff;height:220rpx;border-radius:30rpx;display:flex;flex-direction:column;align-items:center;justify-content:center}.period-icon{font-size:45rpx}.period-title{font-size:32rpx;font-weight:700;margin-top:12rpx}.period-desc{text-align:center;color:#8994a8;font-size:22rpx;margin-top:10rpx}.recent{margin-top:50rpx}.review-item{height:150rpx;background:#fff;border-radius:30rpx;margin-top:18rpx;display:flex;align-items:center;padding:0 25rpx;box-shadow:0 5rpx 20rpx rgba(50,80,120,.05)}.review-icon{font-size:55rpx}.review-content{flex:1;margin-left:20rpx}.review-title{display:block;font-size:34rpx;font-weight:700}.review-meta{display:block;color:#8994a8;margin-top:12rpx}.status{font-size:22rpx;color:#16b77a;background:#e8fff4;padding:10rpx;border-radius:20rpx}.right{font-size:50rpx;color:#8994a8}.tabbar{position:fixed;bottom:0;left:0;right:0;height:140rpx;background:#fff;display:flex;justify-content:space-around;align-items:center;border-radius:40rpx 40rpx 0 0}.tabbar view{display:flex;flex-direction:column;align-items:center;color:#8994a8;font-size:30rpx}.tabbar text{font-size:24rpx}.active{color:#3788ff!important}
</style>
