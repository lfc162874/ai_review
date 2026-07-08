<template>
  <view class="tabbar">
    <view
      v-for="item in items"
      :key="item.key"
      :class="['item', item.key === active ? 'active' : '']"
      @click="onTabClick(item)"
    >
      <image class="icon" :src="getIcon(item)" mode="widthFix" />
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{ active?: string }>()

const items = [
  { name: '首页', key: 'home' },
  { name: '复盘', key: 'review' },
  { name: '动态', key: 'growth' },
  { name: '我的', key: 'profile' },
]

const getIcon = (item: { name: string; key: string }) => {
  if (item.key === 'review' && props.active === 'review') {
    return '/static/icons/nav_review_active.svg'
  }
  if (item.key === 'review') {
    return '/static/icons/nav_review.svg'
  }
  if (item.key === 'growth') {
    return '/static/icons/growth/trend.svg'
  }
  return `/static/icons/nav_${item.key}.svg`
}

const onTabClick = (item: { name: string; key: string }) => {
  if (item.key === props.active) return

  switch (item.key) {
    case 'home':
      uni.switchTab({ url: '/pages/index/index' })
      break
    case 'review':
      uni.navigateTo({ url: '/pages/review/voice' })
      break
    case 'growth':
      uni.navigateTo({ url: '/pages/growth/index' })
      break
    case 'profile':
      uni.showToast({ title: '我的页敬请期待', icon: 'none' })
      break
  }
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: 24rpx;
  height: 132rpx;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(30rpx);
  border-radius: 44rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 10rpx 40rpx rgba(30, 60, 100, 0.12);
  z-index: 100;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8994a8;
  font-size: 24rpx;
}
.icon {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 8rpx;
  filter: grayscale(100%);
}
.active {
  color: #3788ff;
}
.active .icon {
  filter: invert(42%) sepia(79%) saturate(2451%) hue-rotate(198deg) brightness(100%) contrast(101%);
}
</style>
