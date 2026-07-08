<template>
  <view :class="['card', type]" @click="handleClick">
    <view class="icon-bg">
      <svg v-if="type === 'voice'" width="120" height="120" viewBox="0 0 120 120" fill="none"><rect width="120" height="120" rx="60" fill="white" fill-opacity="0.35"/><path d="M60 28c11 0 20 9 20 20v14c0 11-9 20-20 20s-20-9-20-20V48c0-11 9-20 20-20z" stroke="white" stroke-width="6"/><path d="M40 62c0 11 9 20 20 20s20-9 20-20M60 82v16" stroke="white" stroke-width="6" stroke-linecap="round"/></svg>
      <svg v-else width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" rx="60" fill="white" fill-opacity="0.35"/><path d="M28 38c0-5.5 4.5-10 10-10h44c5.5 0 10 4.5 10 10v40c0 5.5-4.5 10-10 10H50l-18 12V88h-6c-5.5 0-10-4.5-10-10V38z" fill="white"/></svg>
    </view>
    <text class="card-title">{{ title }}</text>
    <text class="card-desc">{{ desc }}</text>
    <view class="arrow">→</view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{ title:string; desc:string; type:'voice'|'chat' }>()

const handleClick = () => {
  if (props.type === 'voice') {
    uni.navigateTo({ url: '/pages/review/voice' })
  } else if (props.type === 'chat') {
    uni.navigateTo({ url: '/pages/review/chat' })
  }
}
</script>

<style scoped>
.card{flex:1;height:420rpx;border-radius:40rpx;display:flex;flex-direction:column;align-items:center;padding-top:50rpx;position:relative;overflow:hidden;box-shadow:0 10rpx 30rpx rgba(50,80,120,.08)}
.voice{background:linear-gradient(180deg,#e8f9f1,#d1f4e2)}.chat{background:linear-gradient(180deg,#eef4ff,#d6e4ff)}
.icon-bg{width:160rpx;height:160rpx;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:24rpx}.voice .icon-bg{background:linear-gradient(135deg,#3cd08f,#22b573)}.chat .icon-bg{background:linear-gradient(135deg,#5c9aff,#3b86ff)}
.icon-bg svg{width:120rpx;height:120rpx}.card-title{font-size:38rpx;font-weight:700;color:#14223a}.card-desc{margin-top:14rpx;font-size:26rpx;color:#68758d}.arrow{width:72rpx;height:72rpx;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;margin-top:28rpx}
</style>
