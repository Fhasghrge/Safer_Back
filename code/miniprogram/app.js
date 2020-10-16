//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   // 获取用户信息
    // wx.getSetting({
    //   // 查看是否授权
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权
    //       wx.getUserInfo({
    //         success: function(res) {
    //           // 可以将 res 发送给后台解码出 unionId
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {//返回后才启动onload
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     } else {
    //     }
    //   }
    // })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'zhangshuang',//!!! 在这里改成你的环境ID
        traceUser: true,
      })
    }
  },
  globalData: {
    // userInfo: null,
    userInfo: {
      name: '张爽',
      num: 2018081311021
    },
    isLogin: false,
    /**
     * Progress说明
     * 0 游客
     * 1 已经身份认账
     * 2 已经行程报备
     * 3 已经进校表单填写
     */
    progress: 0,
  }
})