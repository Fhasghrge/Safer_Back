// pages/tec/tec.js
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    btnstate: "default",
    account:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  accountInput: function (e){
    var content = e.detail.value;
    console.log(content);
    if(content!=""){
      this.setData({disabled:false,btnstate:"primary",account:content});
    }
    //console.log(this.account)
  },
  pwdBlur: function (e) {
    var password = e.detail.value;
    console.log(password);
    if(password!=""){
      this.setData({password:password});

    }
  },
  login:function() {
    //var that=this;
      //var a=(this.account=="201922140221");
      //var b=(this.password=="yyx18682269718");
     // console.log(that.account);
     // console.log(b);

     if(this.data.account=="201922140221"&&this.data.password=="yyx18682269718")
{
   wx.showToast({
    title: '登陆成功！',
  })
      wx.navigateTo({
        url: '../search/search',
      })
}
    else{
            wx.showToast({
              title: '账号或密码错误！',
            })
    }
  },
})