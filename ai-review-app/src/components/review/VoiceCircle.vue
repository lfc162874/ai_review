<template><view :class="['voice-circle',status]"><view class="pulse pulse-one"></view><view class="pulse pulse-two"></view><image src="/static/icons/listen.svg"/></view></template>
<script setup lang="ts">
import { computed } from 'vue'
import { useReviewStore } from '@/stores/review'
const store=useReviewStore()
const status=computed(()=>store.status)
</script>
<style scoped>
.voice-circle{width:280rpx;height:280rpx;border-radius:50%;background:linear-gradient(135deg,#6db5ff,#3788ff);display:flex;align-items:center;justify-content:center;position:relative;box-shadow:0 0 80rpx rgba(55,136,255,.35);transition:.3s}
image{width:130rpx;z-index:3}.pulse{position:absolute;inset:0;border-radius:50%;border:20rpx solid rgba(55,136,255,.15)}
.listening .pulse-one{animation:pulse 2s infinite}.transcribing .pulse-one{animation:pulse 1s infinite}.completed{background:linear-gradient(135deg,#5ed49b,#22b573)}
.pulse-two{animation:pulse 2s 1s infinite}
@keyframes pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}
</style>