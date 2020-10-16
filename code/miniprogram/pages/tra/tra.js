// pages/tra/tra.js
const CDN_PATH = 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images';
const MOYUAN_KEY = 'E7LBZ-LZPRJ-PX6F7-F4XSA-F3TSF-X2BLR';
const REFERER = '蓝绘';

const app = getApp()
Page({
  // mixins: [require('../../weui-wxss-master/dist/mixin/themeChanged')],
  /**
   * 页面的初始数据
   */
  data: {
    startPoint: null,
    endPoint: null,
    files: [],
    customStyles: [
      { text: '墨渊', value: MOYUAN_KEY, icon: `${CDN_PATH}/iconMapMoyuan@3x.png` },
    ],
    keyIndex: 0,
    active: -1,
    steps: [
      {
        // text: '步骤一',
        desc: '输入起点'
      },
      {
        // text: '步骤二',
        desc: '输入终点'
      },
      {
        // text: '步骤三',
        desc: '票据上传'
      },
      {
        // text: '步骤四',
        desc: '提交'
      }
    ],
  },

  onLoad: function (options) {
    // wx.showModal({
    //   title: '提示',
    //   content: '你可以提前填入行程信息，但是只有你被批准进校之后，你的信息才会被受理！',
    //   showCancel: false
    // })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },
  //获取起点位置
  onChooseStartPoint() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          startPoint: res,
          active: 0
        });
        console.log(res)
      }
    });
  },
  //选择终点
  onChooseEndPoint() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          endPoint: res,
          active: 1
        });
        console.log(res)
      }
    });
  },
  //上传文件
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: async function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          active: 2
        });
        // try {
        //   const invokeRes = await wx.serviceMarket.invokeService({
        //     service: 'wx79ac3de8be320b71',
        //     api: 'OcrAllInOne',
        //     data: {
        //       // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
        //       img_url: new wx.serviceMarket.CDN({
        //         type: 'filePath',
        //         filePath: res.tempFilePaths[0],
        //       }),
        //       data_type: 3,
        //       ocr_type: 8
        //     },
        //   })
        //   that.setData({
        //    sname:invokeRes.data.ocr_comm_res.items[3].text,
        //    sid:invokeRes.data.ocr_comm_res.items[7].text,
        //    sxy:invokeRes.data.ocr_comm_res.items[5].text,
        //    sch:invokeRes.data.ocr_comm_res.items[0].text,
        //    bs:invokeRes.data.ocr_comm_res.items[1].text
        // });
        //   console.log('invokeService success', invokeRes)
        //   wx.showModal({
        //     title: 'success',
        //     content: JSON.stringify(invokeRes),
        //   })
        // } catch (err) {
        //   console.error('invokeService fail', err)
        //   wx.showModal({
        //     title: 'fail',
        //     content: err,
        //   })
        // }  

      },
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  submitTra: function () {
    /**
     * 需要进行表单校验
     */
    wx.cloud.callFunction({
      name: 'route',
      data: {
        start: this.data.startPoint,
        end: this.data.endPoint,
        fileid: this.data.files
      },
      success: () => {
        app.globalData.progress = 2
        wx.cloud.callFunction({
          name: 'overview',
          data: {
            route: 1
          },
          success: () => {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: () => {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/per/per'
                  })
                }, 2000);
              }
            })
          }
        })
      } 
    })
  }

})