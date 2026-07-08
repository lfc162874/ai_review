<script setup lang="ts">
import { ref } from 'vue'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
const agreed = ref(false)

const loginWithWechat = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' })
    return
  }
  uni.showToast({ title: '微信登录开发中', icon: 'none' })
}

const loginWithPhone = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' })
    return
  }
  uni.navigateTo({ url: '/pages/login/phone' })
}

const loginWithApple = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' })
    return
  }
  uni.showToast({ title: 'Apple 登录开发中', icon: 'none' })
}

const loginWithMail = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' })
    return
  }
  uni.showToast({ title: '邮箱登录开发中', icon: 'none' })
}

const loginWithLogo = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' })
    return
  }
  uni.showToast({ title: '第三方登录开发中', icon: 'none' })
}

const openUserAgreement = () => {
  uni.showToast({ title: '用户协议开发中', icon: 'none' })
}

const openPrivacyPolicy = () => {
  uni.showToast({ title: '隐私政策开发中', icon: 'none' })
}
</script>

<template>
  <view class="page">
    <image class="bg-image" src="/static/images/auth/blue_gradient.svg" mode="aspectFill" />

    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }" />

    <!-- 顶部标题 -->
    <view class="header">
      <view class="title-wrap">
        <image class="star star-left" src="/static/icons/sparkles.svg" mode="widthFix" />
        <text class="title">小悟同学</text>
        <image class="star star-right" src="/static/icons/sparkles.svg" mode="widthFix" />
      </view>
      <text class="subtitle">像聊天一样复盘，像教练一样总结</text>
    </view>

    <!-- 插画区 -->
    <view class="illustration">
      <image class="robot" src="/static/images/auth/logo.svg" mode="widthFix" />
      <image class="float-chart" src="/static/images/auth/float_chart.svg" mode="widthFix" />
      <image class="float-task" src="/static/images/auth/float_task.svg" mode="widthFix" />
    </view>

    <!-- 底部登录面板 -->
    <view class="login-panel">
      <view class="btn btn-primary" @click="loginWithWechat">
        <image class="btn-icon" src="/static/icons/auth/wechat.svg" mode="widthFix" />
        <text class="btn-text">微信登录</text>
      </view>

      <view class="btn btn-secondary" @click="loginWithPhone">
        <image class="btn-icon" src="/static/icons/auth/phone.svg" mode="widthFix" />
        <text class="btn-text">手机号登录</text>
      </view>

      <view class="divider">
        <view class="line" />
        <text class="divider-text">其他登录方式</text>
        <view class="line" />
      </view>

      <view class="third-party">
        <view class="icon-btn" @click="loginWithApple">
          <image class="third-icon" src="/static/icons/auth/apple.svg" mode="widthFix" />
        </view>
        <view class="icon-btn" @click="loginWithLogo">
          <image class="third-icon" src="/static/icons/auth/logo_bot.svg" mode="widthFix" />
        </view>
        <view class="icon-btn" @click="loginWithMail">
          <image class="third-icon" src="/static/icons/auth/mail.svg" mode="widthFix" />
        </view>
      </view>

      <view class="agreement">
        <view class="checkbox" @click="agreed = !agreed">
          <image v-if="agreed" class="checkbox-icon" src="/static/icons/auth/agree_checked.svg" mode="widthFix" />
          <view v-else class="checkbox-empty" />
        </view>
        <text class="agreement-text">
          我已阅读并同意
          <text class="link" @click.stop="openUserAgreement">《用户协议》</text>
          和
          <text class="link" @click.stop="openPrivacyPolicy">《隐私政策》</text>
        </text>
      </view>

      <!-- iPhone Home Indicator -->
      <view class="home-indicator" />
    </view>
  </view>
</template>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.status-bar {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

/* Header */
.header {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40rpx;
  flex-shrink: 0;
}

.title-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 72rpx;
  font-weight: 800;
  color: #14223a;
  line-height: 1;
}

.star {
  width: 44rpx;
  height: 44rpx;
  flex-shrink: 0;
}

.star-left {
  margin-right: 16rpx;
  margin-top: -20rpx;
}

.star-right {
  margin-left: 16rpx;
  margin-top: -20rpx;
}

.subtitle {
  margin-top: 24rpx;
  font-size: 28rpx;
  color: #68758d;
  line-height: 1;
}

/* Illustration */
.illustration {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  margin: 0;
}

.robot {
  width: 700rpx;
  max-height: 100%;
  z-index: 1;
}

.float-chart {
  position: absolute;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 170rpx;
  margin-top: -180rpx;
  z-index: 2;
}

.float-task {
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 170rpx;
  margin-top: -140rpx;
  z-index: 2;
}

/* Login panel */
.login-panel {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  padding: 0 60rpx 60rpx;
  box-sizing: border-box;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96rpx;
  border-radius: 48rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 10rpx 30rpx rgba(50, 80, 120, 0.08);
}

.btn-primary {
  background: #3788ff;
}

.btn-secondary {
  background: #ffffff;
}

.btn-icon {
  width: 44rpx;
  height: 44rpx;
  margin-right: 12rpx;
  vertical-align: middle;
}

.btn-text {
  font-size: 32rpx;
  font-weight: 700;
}

.btn-primary .btn-text {
  color: #ffffff;
}

.btn-secondary .btn-text {
  color: #14223a;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32rpx 0;
}

.line {
  flex: 1;
  height: 1rpx;
  background: #e1e8f0;
}

.divider-text {
  margin: 0 24rpx;
  font-size: 26rpx;
  color: #8994a8;
  white-space: nowrap;
}

/* Third party login */
.third-party {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60rpx;
  margin-bottom: 36rpx;
}

.icon-btn {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6rpx 20rpx rgba(50, 80, 120, 0.08);
}

.third-icon {
  width: 48rpx;
  height: 48rpx;
}

/* Agreement */
.agreement {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 24rpx;
}

.checkbox {
  width: 32rpx;
  height: 32rpx;
  margin-right: 12rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.checkbox-icon {
  width: 32rpx;
  height: 32rpx;
}

.checkbox-empty {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #b0b9c8;
  box-sizing: border-box;
}

.agreement-text {
  font-size: 24rpx;
  color: #8994a8;
  line-height: 1.5;
}

.link {
  color: #3788ff;
}

/* Home indicator */
.home-indicator {
  width: 268rpx;
  height: 8rpx;
  background: #14223a;
  border-radius: 4rpx;
  margin: 0 auto;
  opacity: 0.15;
}
</style>
