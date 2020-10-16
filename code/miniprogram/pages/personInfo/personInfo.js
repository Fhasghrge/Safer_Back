// pages/personInfo/personInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    snumber:"",
    age:"",
    xueyuan:"",
    idistrue:"否",
    xcistrue:"否",
    jkma:"否",
    ishealth:"否",
    issp:"否",
    isbb:"否",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'search',
      data:{
        num: app.globalData.userInfo.num
      },
      success:(res)=>{
        this.setData({
          name:res.result.info[0].name,
          snumber:res.result.info[0].num,
          xueyuan:res.result.info[0].department,
          idistrue:res.result.view[0].ident,
          xcistrue:res.result.view[0].route,
          jkma:res.result.view[0].healcode,
          ishealth:res.result.view[0].heal,
          issp:res.result.view[0].form,
          isbb:res.result.view[0].report
        }); 
    
      },
      fail:(res)=>{
        wx.showToast({
          title: res.errMsg
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})