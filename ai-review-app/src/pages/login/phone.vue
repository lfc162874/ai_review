<script setup lang="ts">
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
const agreed = ref(false)
const phone = ref('')
const code = ref('')
const countdown = ref(0)
const userStore = useUserStore()

const codeText = computed(() => {
  return countdown.value > 0 ? `${countdown.value}s` : '获取验证码'
})

const isPhoneValid = computed(() => {
  return /^1[3-9]\d{9}$/.test(phone.value)
})

const canSendCode = computed(() => {
  return isPhoneValid.value && countdown.value === 0
})

const canLogin = computed(() => {
  return isPhoneValid.value && code.value.length >= 4 && agreed.value
})

const goBack = () => {
  uni.navigateBack()
}

const openHelp = () => {
  uni.showToast({ title: '帮助中心开发中', icon: 'none' })
}

let timer: ReturnType<typeof setInterval> | null = null

const sendCode = async () => {
  if (!canSendCode.value) return
  try {
    await authApi.sendCode({ phone: phone.value })
    countdown.value = 60
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0 && timer) {
        clearInterval(timer)
        timer = null
      }
    }, 1000)
    uni.showToast({ title: '验证码已发送', icon: 'none' })
  } catch (e: any) {
    // 错误码 20011：发送过于频繁，由 request.ts 统一 toast 提示
  }
}

const handleLogin = async () => {
  if (!isPhoneValid.value) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  if (code.value.length < 4) {
    uni.showToast({ title: '请输入正确的验证码', icon: 'none' })
    return
  }
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' })
    return
  }
  try {
    const res = await authApi.phoneLogin({ phone: phone.value, code: code.value })
    userStore.setToken(res.data.accessToken, res.data.refreshToken)
    userStore.setUserInfo(res.data.user)
    uni.switchTab({ url: '/pages/index/index' })
  } catch (e: any) {
    // 错误码 20009/20010 由 request.ts 统一 toast 提示
  }
}

const openUserAgreement = () => {
  uni.showToast({ title: '用户协议开发中', icon: 'none' })
}

const openPrivacyPolicy = () => {
  uni.showToast({ title: '隐私政策开发中', icon: 'none' })
}

const loginWithApple = () => {
  uni.showToast({ title: 'Apple 登录开发中', icon: 'none' })
}

const loginWithLogo = () => {
  uni.showToast({ title: '第三方登录开发中', icon: 'none' })
}

const loginWithMail = () => {
  uni.showToast({ title: '邮箱登录开发中', icon: 'none' })
}
</script>

<template>
  <view class="page">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }" />

    <!-- 导航栏 -->
    <view class="navbar">
      <view class="back" @click="goBack">
        <image src="/static/icons/auth/back.svg" mode="widthFix" />
      </view>
      <text class="help" @click="openHelp">帮助</text>
    </view>

    <!-- 标题 -->
    <view class="header">
      <text class="title">手机号登录</text>
      <text class="subtitle">未注册的手机号将自动创建账号</text>
    </view>

    <!-- 输入框 -->
    <view class="form">
      <view class="input-row">
        <view class="country-code">
          <text class="code-text">+86</text>
          <view class="arrow-down" />
        </view>
        <input
          class="input"
          v-model="phone"
          type="number"
          maxlength="11"
          placeholder="请输入手机号"
          placeholder-class="placeholder"
        />
      </view>

      <view class="input-row">
        <input
          class="input code-input"
          v-model="code"
          type="number"
          maxlength="6"
          placeholder="请输入验证码"
          placeholder-class="placeholder"
        />
        <text
          :class="['send-code', canSendCode ? 'active' : '']"
          @click="sendCode"
        >
          {{ codeText }}
        </text>
      </view>
    </view>

    <!-- 登录按钮 -->
    <view :class="['login-btn', canLogin ? 'active' : '']" @click="handleLogin">
      <text>登录</text>
    </view>

    <!-- 协议 -->
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

    <!-- 其他登录方式 -->
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

    <!-- Home indicator -->
    <view class="home-indicator" />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #ffffff;
  padding: 0 60rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.status-bar {
  flex-shrink: 0;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  flex-shrink: 0;
}

.back {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -16rpx;
}

.back image {
  width: 40rpx;
  height: 40rpx;
}

.help {
  font-size: 30rpx;
  color: #14223a;
}

/* Header */
.header {
  margin-top: 40rpx;
  margin-bottom: 60rpx;
  flex-shrink: 0;
}

.title {
  display: block;
  font-size: 52rpx;
  font-weight: 800;
  color: #14223a;
  line-height: 1;
}

.subtitle {
  display: block;
  margin-top: 24rpx;
  font-size: 28rpx;
  color: #8994a8;
}

/* Form */
.form {
  flex-shrink: 0;
}

.input-row {
  display: flex;
  align-items: center;
  height: 96rpx;
  background: #f8fbff;
  border-radius: 24rpx;
  padding: 0 30rpx;
  margin-bottom: 30rpx;
}

.country-code {
  display: flex;
  align-items: center;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.code-text {
  font-size: 32rpx;
  font-weight: 700;
  color: #14223a;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 8rpx solid transparent;
  border-right: 8rpx solid transparent;
  border-top: 10rpx solid #8994a8;
  margin-left: 10rpx;
}

.input {
  flex: 1;
  height: 96rpx;
  font-size: 32rpx;
  color: #14223a;
}

.code-input {
  margin-right: 20rpx;
}

.placeholder {
  color: #b0b9c8;
}

.send-code {
  font-size: 28rpx;
  color: #b0b9c8;
  flex-shrink: 0;
}

.send-code.active {
  color: #3788ff;
}

/* Login button */
.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96rpx;
  border-radius: 48rpx;
  margin-top: 48rpx;
  background: #a8cfff;
}

.login-btn text {
  font-size: 32rpx;
  font-weight: 700;
  color: #ffffff;
}

.login-btn.active {
  background: #3788ff;
  box-shadow: 0 10rpx 30rpx rgba(55, 136, 255, 0.25);
}

/* Agreement */
.agreement {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 30rpx;
  flex-shrink: 0;
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

/* Divider */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80rpx;
  margin-bottom: 36rpx;
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
  margin-bottom: 40rpx;
  flex-shrink: 0;
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

/* Home indicator */
.home-indicator {
  width: 268rpx;
  height: 8rpx;
  background: #14223a;
  border-radius: 4rpx;
  margin: 0 auto;
  opacity: 0.15;
  flex-shrink: 0;
  margin-bottom: 20rpx;
}
</style>
