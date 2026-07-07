<template>
  <view :class="['card', type]" @click="handleClick">
    <view class="icon-bg">
      <svg v-if="type === 'voice'" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="60" fill="white" fill-opacity="0.35"/>
        <path d="M60 28c11 0 20 9 20 20v14c0 11-9 20-20 20s-20-9-20-20V48c0-11 9-20 20-20z" stroke="white" stroke-width="6"/>
      </svg>
      <svg v-else width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="60" fill="white" fill-opacity=".35"/></svg>
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
    uni.navigateTo({url:'/pages/review/voice'})
  }
}
</script>

<style scoped>
.card{flex:1;height:480rpx;border-radius:40rpx;display:flex;flex-direction:column;align-items:center;padding-top:60rpx;position:relative;overflow:hidden;box-shadow:0 10rpx 30rpx rgba(50,80,120,.08)}
.voice{background:linear-gradient(180deg,#e8f9f1,#d1f4e2)}.chat{background:linear-gradient(180deg,#eef4ff,#d6e4ff)}
.icon-bg{width:180rpx;height:180rpx;border-radius:50%;display:flex;align-items:center;justify-content:center}.voice .icon-bg{background:#22b573}.chat .icon-bg{background:#3b86ff}.card-title{margin-top:30rpx;font-size:38rpx;font-weight:700}.card-desc{margin-top:14rpx;color:#68758d}.arrow{margin-top:35rpx;background:#fff;width:72rpx;height:72rpx;border-radius:50%;display:flex;align-items:center;justify-content:center}
</style>
