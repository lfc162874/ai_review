<template>
  <view class="card">
    <view class="header">
      <image class="icon" src="/static/icons/sparkles.svg" mode="widthFix" />
      <text class="title">AI 实时提炼</text>
    </view>
    <view class="items">
      <view class="item green">
        <image class="item-icon" src="/static/icons/review/result_icon.svg" mode="widthFix" />
        <text class="item-title">关键成果</text>
        <text class="item-text">权限中心重构</text>
        <text class="item-text">第一版上线</text>
      </view>
      <view class="item orange">
        <image class="item-icon" src="/static/icons/review/problem_icon.svg" mode="widthFix" />
        <text class="item-title">主要问题</text>
        <text class="item-text">需求多次变更，</text>
        <text class="item-text">沟通成本高</text>
      </view>
      <view class="item purple">
        <image class="item-icon" src="/static/icons/review/question_icon.svg" mode="widthFix" />
        <text class="item-title">待深入追问</text>
        <text class="item-text">如何减少需求</text>
        <text class="item-text">反复修改？</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 36rpx;
  padding: 28rpx;
  margin-top: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(50, 80, 120, 0.06);
  position: relative;
  z-index: 1;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.icon {
  width: 44rpx;
  height: 44rpx;
  margin-right: 12rpx;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
  color: #14223a;
}

.items {
  display: flex;
  gap: 14rpx;
}

.item {
  flex: 1;
  padding: 20rpx;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
}

.item-icon {
  width: 44rpx;
  height: 44rpx;
  margin-bottom: 12rpx;
}

.item-title {
  font-size: 24rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}

.item-text {
  font-size: 22rpx;
  line-height: 1.5;
  color: #14223a;
}

.green {
  background: #ecfbf5;
}
.green .item-title {
  color: #22b573;
}

.orange {
  background: #fff5e8;
}
.orange .item-title {
  color: #ff9f43;
}

.purple {
  background: #f3efff;
}
.purple .item-title {
  color: #8b5cf6;
}
</style>
