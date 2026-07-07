<script setup lang="ts">
</script>

<template>
  <slot />
</template>

<style>
page {
  background: #f7fbff;
  color: #14223a;
}

/* 隐藏 UniApp H5 默认 tabBar，只保留自定义的 HomeTabBar */
.uni-tabbar,
.uni-tabbar-bottom,
uni-tabbar {
  display: none !important;
}
</style>
