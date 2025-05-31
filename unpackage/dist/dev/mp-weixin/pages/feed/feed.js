"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    const now = /* @__PURE__ */ new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].substring(0, 5);
    return {
      feed_method: "0",
      feed_num: "",
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
        common_vendor.index.showToast({ title: "请输入有效的投喂量", icon: "none" });
        return;
      }
      let data = {
        feed_method: parseInt(this.feed_method),
        feed_num: parseFloat(this.feed_num)
      };
      if (this.feed_method === "1") {
        if (!this.feed_date || !this.feed_time) {
          common_vendor.index.showToast({ title: "请选择投喂时间", icon: "none" });
          return;
        }
        data.feed_time = `${this.feed_date} ${this.feed_time}:00`;
      }
      console.log(this.feed_time);
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/feed",
        // 替换为树莓派实际 IP 和端口
        method: "POST",
        data,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.showToast({ title: "设置成功", icon: "success" });
          } else {
            common_vendor.index.showToast({ title: "设置失败", icon: "none" });
          }
        },
        fail: (err) => {
          console.error(err);
          common_vendor.index.showToast({ title: "网络错误", icon: "none" });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.feed_method === "0",
    b: $data.feed_method === "1",
    c: common_vendor.o((...args) => $options.onMethodChange && $options.onMethodChange(...args)),
    d: $data.feed_num,
    e: common_vendor.o(($event) => $data.feed_num = $event.detail.value),
    f: $data.feed_method === "1"
  }, $data.feed_method === "1" ? {
    g: common_vendor.t($data.feed_date),
    h: $data.feed_date,
    i: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    j: common_vendor.t($data.feed_time),
    k: $data.feed_time,
    l: common_vendor.o((...args) => $options.onTimeChange && $options.onTimeChange(...args))
  } : {}, {
    m: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/learning_codes/uniapp/automatic pet feeding/pages/feed/feed.vue"]]);
wx.createPage(MiniProgramPage);
