"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/history",
        // 替换为树莓派实际 IP 和端口
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            this.history = res.data;
          } else {
            common_vendor.index.showToast({ title: "获取历史记录失败", icon: "none" });
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
  return {
    a: common_vendor.o((...args) => $options.fetchHistory && $options.fetchHistory(...args)),
    b: common_vendor.f($data.history, (item, index, i0) => {
      return {
        a: common_vendor.t(item.time),
        b: common_vendor.t(item.amount),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/learning_codes/uniapp/automatic pet feeding/pages/history/history.vue"]]);
wx.createPage(MiniProgramPage);
