// pages/inSchoool/inSchool.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: -1,
    steps: [
      {
        // text: '步骤二',
        desc: '校医院审核'
      },
      {
        // text: '步骤三',
        desc: '保卫处审核'
      },
      {
        // text: '步骤四',
        desc: '宿管中心审核'
      },
      {
        desc: '学院审核'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    wx.cloud.callFunction({
      name: 'search',
      data: {
        num: app.globalData.userInfo.num
      },
      success: (res) => {
        console.log(res)
      },
      fail: () => {
        console.log('fail')
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    /**
     * 当用户刷新的时候请求当前审核状态
     */
  }
})