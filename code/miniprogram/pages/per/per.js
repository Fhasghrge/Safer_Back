// pages/per/per.js
Page({
  data: {
    active: -1,
    steps: [
      {
        // text: '步骤二',
        desc: '健康码'
      },
      {
        // text: '步骤三',
        desc: '健康信息表'
      },
      {
        // text: '步骤四',
        desc: '进校审批单'
      },
      {
        desc: '宿舍入住'
      }
    ]
  },

  onCheckAuth: function () {
    let that = this
    wx.navigateToMiniProgram({
      appId: 'wx34b9f47827e4801d',//要打开的小程序 appId
      path: '',//打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'bar'//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'release',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
        wx.cloud.callFunction({
          name: 'overview',
          data: {
            healcode: 1
          }
        })
        that.setData({
          active: 0
        })
      }
    })

  },
  onClickTwo: function () {
    if (this.data.active === 0) {
      this.setData({
        active: 1
      })
    }
  },
  onClickThree: function () {
    if (this.data.active === 1) {
      wx.cloud.callFunction({
        name: 'overview',
        data: {
          form: 1
        }
      })
      this.setData({
        active: 2
      })
    }
  },
  onClickFour: function () {
    if (this.data.active === 2) {
      wx.cloud.callFunction({
        name: 'overview',
        data: {
          pass_dorm: 1
        }
      })
      wx.showToast({
        title: '请在门口登记',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            this.setData({
              active: 3
            })
            wx.switchTab({
              url: '/pages/per/per'
            })
          }, 2000);
        }
      })
    }
  },
  submit: function () {
    /**
     * TODO:
     * 完成报备请求
     * progress+ 1
     */
    wx.cloud.callFunction({
      name: 'overview',
      data: {
        report: 1
      },
      success: () => {
        wx.showModal({
          title: '你已经完成所有报备！'
        })
      }
    })
  }
})