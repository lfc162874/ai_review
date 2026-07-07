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
