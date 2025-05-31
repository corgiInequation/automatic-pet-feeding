<template>
  <view class="container">
    <view class="form-item">
      <text>投喂方式：</text>
      <radio-group @change="onMethodChange">
        <label>
          <radio value="0" :checked="feed_method === '0'" />自动投喂
        </label>
        <label>
          <radio value="1" :checked="feed_method === '1'" />手动设置时间投喂
        </label>
      </radio-group>
    </view>
    <view class="form-item">
      <text>投喂量（克）：</text>
      <input type="number" v-model="feed_num" placeholder="请输入投喂量" />
    </view>
    <view class="form-item" v-if="feed_method === '1'">
      <text>投喂时间：</text>
      <picker mode="date" :value="feed_date" @change="onDateChange">
        <view>{{feed_date}}</view>
      </picker>
      <picker mode="time" :value="feed_time" @change="onTimeChange">
        <view>{{feed_time}}</view>
      </picker>
    </view>
    <button @click="submit">提交</button>
  </view>
</template>

<script>
export default {
  data() {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
    return {
      feed_method: '0',
      feed_num: '',
      feed_date: currentDate,
      feed_time: currentTime
    };
  },
  methods: {
    onMethodChange(e) {
      this.feed_method = e.detail.value;
    },
    onDateChange(e) {
      this.feed_date = e.detail.value;
    },
    onTimeChange(e) {
      this.feed_time = e.detail.value;
    },
    submit() {
      if (!this.feed_num || isNaN(parseFloat(this.feed_num))) {
        uni.showToast({ title: '请输入有效的投喂量', icon: 'none' });
        return;
      }
      let data = {
        feed_method: parseInt(this.feed_method),
        feed_num: parseFloat(this.feed_num)
      };
      if (this.feed_method === '1') {
        if (!this.feed_date || !this.feed_time) {
          uni.showToast({ title: '请选择投喂时间', icon: 'none' });
          return;
        }
        data.feed_time = `${this.feed_date} ${this.feed_time}:00`;
      }
	  console.log(this.feed_time)
      uni.request({
        url: 'http://127.0.0.1:8080/feed', // 替换为树莓派实际 IP 和端口
        method: 'POST',
        data: data,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.showToast({ title: '设置成功', icon: 'success' });
          } else {
            uni.showToast({ title: '设置失败', icon: 'none' });
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
.container {
  padding: 20px;
}
.form-item {
  margin-bottom: 20px;
}
.form-item text {
  display: inline-block;
  width: 150px;
}
.form-item input, .form-item picker {
  display: inline-block;
  width: 200px;
}
</style>