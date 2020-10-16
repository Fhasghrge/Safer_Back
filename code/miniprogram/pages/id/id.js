// pages/id/id.js
// const regeneratorRuntime = require('regenerator-runtime')

// 为了获取全局数据
const app = getApp()

Page({
  mixins: [require("../../utils/themeChanged")],
  // mixins: [require('../../mixin/themeChanged')],
  data: {
    topTips: true,
    files: [],
    // 姓名
    sname: '',
    // 学号
    sid: '',
    // 院系
    sxy: '',
    // 学校
    sch: '',
    // 本硕
    bs: ''
  },

  onLoad: function (options) { },

  onReady: function () {
    if (app.globalData.progress === 1) {
      wx.switchTab({
        url: '/pages/tra/tra',
        success() {
          wx.showModal({
            title: '请报告行程',
            content: '您已经提交个人信息'
          })
        }
      })
    }

  },
  /**
   * 提交表单
   * 根据接口提交表单
   * 并且对全局变量中进程 + 1
   * 提交后跳转到形成报告
   */
  submitInfo: function () {
  /**
   * 做表单校验
   */
  console.log(this.data)
    wx.cloud.callFunction({
      name: 'basicinfo',
      data: {
        name: this.data.sname,
        num: this.data.sid,
        department: this.data.sxy,
        degree: this.data.bs,
        school: this.data.sch
      },
      success: (res) => {
        app.globalData.userInfo = this.data
        app.globalData.progress = 1
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            wx.cloud.callFunction({
              name: 'overview',
              data: {
                ident: 1
              },
              success: () => {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/tra/tra'
                  })
                }, 2000);
              }
            })
          }
        })
      },
      fail: err => {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration:2000
        })
      }
    })
  },
  
  onShow: function () {
    //   this.setData({
    //     error: '这是一个错误提示'
    // })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: async function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        try {
          const invokeRes = await wx.serviceMarket.invokeService({
            service: 'wx79ac3de8be320b71',
            api: 'OcrAllInOne',
            data: {
              // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
              img_url: new wx.serviceMarket.CDN({
                type: 'filePath',
                filePath: res.tempFilePaths[0],
              }),
              data_type: 3,
              ocr_type: 8
            },
          })
          that.setData({
            sname: invokeRes.data.ocr_comm_res.items[3].text,
            sid: invokeRes.data.ocr_comm_res.items[7].text,
            sxy: invokeRes.data.ocr_comm_res.items[5].text,
            sch: invokeRes.data.ocr_comm_res.items[0].text,
            bs: invokeRes.data.ocr_comm_res.items[1].text
          });
          console.log('invokeService success', invokeRes)
          wx.showModal({
            title: 'success',
            content: JSON.stringify(invokeRes),
          })
        } catch (err) {
          console.error('invokeService fail', err)
          wx.showModal({
            title: 'fail',
            content: err,
          })
        }

      },
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  scan: function () {
    wx.chooseImage({
      count: 1,
      success: async function (res) {
        try {
          const invokeRes = await wx.serviceMarket.invokeService({
            service: 'wx4418e3e031e551be',
            api: 'OcrAllInOne',
            data: {
              // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
              img_url: new wx.serviceMarket.CDN({
                type: 'filePath',
                filePath: res.tempFilePaths[0],
              }),
              data_type: 3,
              ocr_type: 8
            },
          })
          that.setData({
            sname: invokeRes.data.ocr_comm_res.items[3].text,
            sid: invokeRes.data.ocr_comm_res.items[7].text,
            sxy: invokeRes.data.ocr_comm_res.items[5].text,
            sch: invokeRes.data.ocr_comm_res.items[0].text,
            bs: invokeRes.data.ocr_comm_res.items[1].text
          });
          console.log('invokeService success', invokeRes)
          wx.showModal({
            title: 'success',
            content: JSON.stringify(invokeRes),
          })
        } catch (err) {
          console.error('invokeService fail', err)
          wx.showModal({
            title: 'fail',
            content: err,
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  inputName:function(e){
    this.setData({
      sname: e.detail.value
    })
  },
  inputNum: function (e) {
    this.setData({
      sid: e.detail.value
    })
  },
  inputCollage: function (e) {
    this.setData({
      sxy: e.detail.value
    })
  },
  inputBS: function (e) {
    this.setData({
      bs: e.detail.value
    })
  },
  inputSchool: function (e) {
    this.setData({
      sch: e.detail.value
    })
  }
})