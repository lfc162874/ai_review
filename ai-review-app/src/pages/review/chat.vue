<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HomeTabBar from '@/components/home/HomeTabBar.vue'
import { conversationApi } from '@/api/conversation'
import type { ConversationMessage } from '@/api/conversation'

interface Message {
  type: 'ai' | 'user'
  text: string
}

const messages = ref<Message[]>([])
const inputText = ref('')
const conversationId = ref<string>('')
const loading = ref(false)

const isInputHidden = ref(false)
let scrollTimer: number | null = null

const goBack = () => {
  uni.navigateBack()
}

// 将 API 消息格式映射为页面展示格式
const mapMessage = (msg: ConversationMessage): Message => ({
  type: msg.role === 'assistant' ? 'ai' : 'user',
  text: msg.content,
})

onMounted(async () => {
  try {
    const res = await conversationApi.create({ title: '复盘对话' })
    conversationId.value = res.data.id
    if (res.data.messages) {
      messages.value = res.data.messages.map(mapMessage)
    }
  } catch (e) {
    // 创建会话失败时保留默认引导消息
    messages.value = [
      { type: 'ai', text: '你好！我是你的复盘教练。让我们来一起回顾一下，你今天完成了哪些事情呢？' },
    ]
  }
})

const onScroll = () => {
  isInputHidden.value = true
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
  scrollTimer = setTimeout(() => {
    isInputHidden.value = false
  }, 500) as unknown as number
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text) return
  messages.value.push({ type: 'user', text })
  inputText.value = ''

  if (!conversationId.value) {
    uni.showToast({ title: '会话未创建', icon: 'none' })
    return
  }

  loading.value = true
  try {
    const res = await conversationApi.sendMessage(conversationId.value, { content: text })
    messages.value.push(mapMessage(res.data))
  } catch (e) {
    // 发送失败时移除刚添加的用户消息或提示
    uni.showToast({ title: '消息发送失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

const startVoice = () => {
  uni.showToast({ title: '长按说话功能开发中', icon: 'none' })
}
</script>

<template>
  <view class="page">
    <view class="bg" />

    <!-- Header -->
    <view class="header">
      <view class="back" @click="goBack">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L10 16L20 26" stroke="#14223A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </view>
      <view class="title-wrap">
        <text class="title">对话复盘</text>
        <image class="sparkle" src="/static/icons/sparkles.svg" mode="widthFix" />
      </view>
      <text class="sub">AI 会根据你的回答一步步引导你</text>
    </view>

    <!-- Chat list -->
    <scroll-view class="chat-list" scroll-y @scroll="onScroll">
      <view v-for="(msg, index) in messages" :key="index" :class="['message', msg.type]">
        <image
          class="avatar"
          :src="msg.type === 'ai' ? '/static/icons/chat/ai_avatar.svg' : '/static/icons/chat/user_avatar.svg'"
          mode="widthFix"
        />
        <view class="bubble">
          <text>{{ msg.text }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- Bottom input area -->
    <view :class="['bottom-area', isInputHidden ? 'hidden' : '']">
      <view class="hint">
        <image class="hint-icon" src="/static/icons/chat/voice.svg" mode="widthFix" />
        <text>也可以长按说话，AI 会自动整理重点</text>
      </view>
      <view class="input-bar">
        <input
          class="input"
          v-model="inputText"
          placeholder="输入你的想法..."
          placeholder-class="placeholder"
        />
        <view class="action-btn" @click="inputText.trim() ? sendMessage() : startVoice()">
          <!-- 麦克风图标 -->
          <svg v-if="!inputText.trim()" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="8" width="12" height="22" rx="6" fill="white"/>
            <path d="M12 25C12 33 18 37 24 37C30 37 36 33 36 25M24 37V42" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
          </svg>
          <!-- 发送图标 -->
          <svg v-else width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 6L8 22L22 26L26 40L42 6Z" fill="white"/>
            <path d="M22 26L42 6" stroke="#3788FF" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </view>
      </view>
    </view>

    <HomeTabBar active="review" />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  height: 100vh;
  background: #f8fbff;
  padding: 90rpx 30rpx 0;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 420rpx;
  background: linear-gradient(180deg, #eaf5ff 0%, #f8fbff 100%);
  z-index: 0;
}

/* Header */
.header {
  position: relative;
  z-index: 1;
  margin-bottom: 30rpx;
  flex-shrink: 0;
}

.back {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10rpx;
  margin-bottom: 20rpx;
}

.back svg {
  width: 32rpx;
  height: 32rpx;
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

/* Chat list */
.chat-list {
  position: relative;
  z-index: 1;
  flex: 1;
  overflow: hidden;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 18rpx;
  margin-bottom: 30rpx;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 76rpx;
  height: 76rpx;
  flex-shrink: 0;
  border-radius: 50%;
}

.bubble {
  max-width: 74%;
  padding: 26rpx 30rpx;
  border-radius: 32rpx;
  font-size: 30rpx;
  line-height: 1.6;
  word-break: break-word;
}

.ai .bubble {
  background: #fff;
  color: #14223a;
  border-top-left-radius: 8rpx;
  box-shadow: 0 4rpx 16rpx rgba(50, 80, 120, 0.06);
}

.user .bubble {
  background: #e9f2ff;
  color: #14223a;
  border-top-right-radius: 8rpx;
}

/* Bottom area */
.bottom-area {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  padding-bottom: 180rpx;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.bottom-area.hidden {
  transform: translateY(100%);
  opacity: 0;
  pointer-events: none;
}

/* Hint */
.hint {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
  color: #8994a8;
  font-size: 26rpx;
}

.hint-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 10rpx;
}

/* Input bar */
.input-bar {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #fff;
  border-radius: 44rpx;
  padding: 12rpx 12rpx 12rpx 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(50, 80, 120, 0.06);
}

.input {
  flex: 1;
  height: 70rpx;
  font-size: 30rpx;
  color: #14223a;
}

.placeholder {
  color: #b0b9c8;
}

.action-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #3788ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-btn svg {
  width: 40rpx;
  height: 40rpx;
}
</style>
