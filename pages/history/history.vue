<template>
  <view class="history-list">
    <button @click="fetchHistory">刷新</button>
    <view v-for="(item, index) in history" :key="index" class="history-item">
      <text>时间: {{item.time}}</text>
      <text>投喂量: {{item.amount}} 克</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      history: []
    };
  },
  onShow() {
    this.fetchHistory();
  },
  methods: {
    fetchHistory() {
      uni.request({
        url: 'http://127.0.0.1:8080/history', // 替换为树莓派实际 IP 和端口
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            this.history = res.data;
          } else {
            uni.showToast({ title: '获取历史记录失败', icon: 'none' });
          }
        },
        fail: (err) => {
          console.error(err);
          uni.showToast({ title: '网络错误', icon: 'none' });
        }
      });
    }
  }
};
</script>

<style>
.history-list {
  padding: 10px;
}
.history-item {
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>