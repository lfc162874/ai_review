<script setup lang="ts">
import HomeTabBar from '@/components/home/HomeTabBar.vue'

const posts = [
  {
    name: '柯南',
    time: '今天 18:30',
    content: '这周把权限中心重构第一版落地了，也意识到需求评审前置真的很重要。记录一下，少走弯路。',
    images: ['', '', '', ''],
    hasCard: true,
    cardTitle: '权限中心重构 · 第一版落地',
    cardDesc: '本周完成核心权限模型梳理与接口拆分，新增 12 个权限点，单测覆盖率提升至 82%。',
    tags: [
      { text: '项目推进', color: 'green' },
      { text: '需求对齐', color: 'green' },
      { text: '经验沉淀', color: 'green' },
    ],
  },
  {
    name: '小林',
    time: '今天 12:10',
    content: '复盘后发现，复杂功能最怕边界不清。先对齐目标，再开工，效率高很多。',
    images: [],
    hasCard: false,
    tags: [
      { text: '经验沉淀', color: 'blue' },
      { text: '团队协作', color: 'blue' },
    ],
  },
  {
    name: '阿周',
    time: '昨天 21:05',
    content: '本月开始不只是解决问题，也开始沉淀方法。感觉自己真的在进步。',
    images: [''],
    hasCard: true,
    cardTitle: '6 月成长复盘总结',
    cardDesc: '复盘 18 次，沉淀方法 6 个，养成记录习惯，持续精进中 💪',
    tags: [
      { text: '月复盘', color: 'purple' },
      { text: '成长总结', color: 'purple' },
      { text: '自我提升', color: 'purple' },
    ],
  },
]
</script>

<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <view class="title-wrap">
        <text class="title">成长动态</text>
        <view class="edit-btn">
          <image src="/static/icons/growth/edit.svg" mode="widthFix" />
        </view>
      </view>
      <text class="sub">像朋友圈一样，分享每一次进步</text>
    </view>

    <!-- Compose card -->
    <view class="compose-card">
      <view class="compose-top">
        <image class="avatar" src="/static/icons/growth/avatar_default.svg" mode="widthFix" />
        <input class="compose-input" placeholder="分享一下你今天的复盘收获..." placeholder-class="placeholder" />
      </view>
      <view class="compose-actions">
        <view class="compose-action">
          <image src="/static/icons/growth/post.svg" mode="widthFix" />
          <text>发文字</text>
        </view>
        <view class="compose-action">
          <image src="/static/icons/growth/image.svg" mode="widthFix" />
          <text>发图片</text>
        </view>
      </view>
    </view>

    <!-- Feed -->
    <view class="feed">
      <view v-for="(post, index) in posts" :key="index" class="post">
        <view class="post-header">
          <image class="avatar" src="/static/icons/growth/avatar_default.svg" mode="widthFix" />
          <view class="post-meta">
            <text class="name">{{ post.name }}</text>
            <text class="time">{{ post.time }}</text>
          </view>
          <image class="more" src="/static/icons/growth/more.svg" mode="widthFix" />
        </view>

        <text class="post-content">{{ post.content }}</text>

        <!-- Photo grid -->
        <view v-if="post.images.length" :class="['post-images', post.images.length === 1 ? 'single' : 'grid']">
          <view v-for="(img, i) in post.images" :key="i" class="img-placeholder">
            <image v-if="img" :src="img" mode="aspectFill" />
            <image v-else src="/static/icons/growth/photo_grid.svg" mode="widthFix" />
          </view>
        </view>

        <!-- Summary card -->
        <view v-if="post.hasCard" class="summary-card">
          <view class="card-left">
            <image class="check-icon" src="/static/icons/growth/check_card.svg" mode="widthFix" />
          </view>
          <view class="card-right">
            <text class="card-title">{{ post.cardTitle }}</text>
            <text class="card-desc">{{ post.cardDesc }}</text>
            <view class="tags">
              <text v-for="(tag, tIndex) in post.tags" :key="tIndex" :class="['tag', 'tag-' + tag.color]">{{ tag.text }}</text>
            </view>
          </view>
        </view>

        <!-- Tags (when no card) -->
        <view v-else-if="post.tags.length" class="tags no-card">
          <text v-for="(tag, tIndex) in post.tags" :key="tIndex" :class="['tag', 'tag-' + tag.color]">{{ tag.text }}</text>
        </view>

        <!-- Action bar -->
        <view class="post-actions">
          <view class="action">
            <image src="/static/icons/growth/like.svg" mode="widthFix" />
            <text>点赞</text>
          </view>
          <view class="action-divider" />
          <view class="action">
            <image src="/static/icons/growth/comment.svg" mode="widthFix" />
            <text>评论</text>
          </view>
          <view class="action-divider" />
          <view class="action">
            <image src="/static/icons/growth/share.svg" mode="widthFix" />
            <text>分享</text>
          </view>
        </view>
      </view>
    </view>

    <HomeTabBar active="growth" />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f8fbff;
  padding: 90rpx 30rpx 200rpx;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* Header */
.header {
  margin-bottom: 30rpx;
}

.title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 56rpx;
  font-weight: 800;
  color: #14223a;
  line-height: 1;
}

.edit-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn image {
  width: 44rpx;
  height: 44rpx;
}

.sub {
  display: block;
  margin-top: 12rpx;
  color: #68758d;
  font-size: 28rpx;
}

/* Compose card */
.compose-card {
  background: #fff;
  border-radius: 32rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 6rpx 20rpx rgba(50, 80, 120, 0.05);
}

.compose-top {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.compose-input {
  flex: 1;
  height: 80rpx;
  background: #f5f8ff;
  border-radius: 40rpx;
  padding: 0 30rpx;
  font-size: 30rpx;
  color: #14223a;
}

.placeholder {
  color: #b0b9c8;
}

.compose-actions {
  display: flex;
  justify-content: flex-end;
  gap: 40rpx;
  margin-top: 24rpx;
  padding-right: 10rpx;
}

.compose-action {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 28rpx;
  color: #14223a;
}

.compose-action image {
  width: 40rpx;
  height: 40rpx;
}

/* Feed */
.feed {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.post {
  background: #fff;
  border-radius: 32rpx;
  padding: 28rpx;
  box-shadow: 0 6rpx 20rpx rgba(50, 80, 120, 0.05);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 18rpx;
}

.post-meta {
  flex: 1;
}

.name {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  color: #14223a;
}

.time {
  display: block;
  font-size: 24rpx;
  color: #8994a8;
  margin-top: 6rpx;
}

.more {
  width: 40rpx;
  height: 40rpx;
}

.post-content {
  display: block;
  font-size: 32rpx;
  color: #14223a;
  line-height: 1.6;
  margin-bottom: 18rpx;
}

/* Images */
.post-images {
  margin-bottom: 18rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.post-images.single .img-placeholder {
  width: 180rpx;
  height: 240rpx;
}

.img-placeholder {
  background: #f0f4f9;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.img-placeholder image {
  width: 40rpx;
  height: 40rpx;
}

.grid .img-placeholder {
  width: 180rpx;
  height: 180rpx;
}

/* Summary card */
.summary-card {
  display: flex;
  gap: 20rpx;
  background: #f8fbff;
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 18rpx;
}

.card-left {
  flex-shrink: 0;
}

.check-icon {
  width: 72rpx;
  height: 72rpx;
}

.card-right {
  flex: 1;
  min-width: 0;
}

.card-title {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  color: #14223a;
  margin-bottom: 8rpx;
}

.card-desc {
  display: block;
  font-size: 26rpx;
  color: #68758d;
  line-height: 1.5;
  margin-bottom: 14rpx;
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 18rpx;
}

.tags.no-card {
  margin-bottom: 0;
}

.tag {
  padding: 8rpx 18rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.tag-green {
  background: #e8f9f1;
  color: #22b573;
}

.tag-blue {
  background: #eef4ff;
  color: #3788ff;
}

.tag-purple {
  background: #f3efff;
  color: #8b5cf6;
}

/* Actions */
.post-actions {
  display: flex;
  align-items: center;
  border-top: 1rpx solid #f0f2f5;
  padding-top: 20rpx;
}

.action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  color: #8994a8;
  font-size: 26rpx;
}

.action image {
  width: 36rpx;
  height: 36rpx;
}

.action-divider {
  width: 1rpx;
  height: 32rpx;
  background: #f0f2f5;
}
</style>
