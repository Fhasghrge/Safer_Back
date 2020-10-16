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
    password:"",
    showmmchange:false,
    account2:"",
    oldpassword:"",
    newpassword:""
  },
  accountInput: function (e){
    var content = e.detail.value;
    //console.log(content);
    if(content!=""){
      this.setData({disabled:false,btnstate:"primary",account:content});
    }
    //console.log(this.account)
  },
  pwdBlur: function (e) {
    var password = e.detail.value;
    //console.log(password);
    if(password!=""){
      this.setData({password:password});

    }
  },
  login:function() {
 //调用后台对比账户
  wx.cloud.callFunction({
        name:'login',
        data:{
          user:this.data.account,
          pass:this.data.password
        },
        success:(res)=>{
          wx.showToast({
            title: '登陆成功！',
          }),
          wx.navigateTo({
            url: '../searchnew/searchnew',
          })
        },
        fail:(res)=>{
          wx.showToast({
            title: res.errMsg(1)
          })
        }
  })


//对比结束
    //测试功能代码
//      if(this.data.account=="201922140221"&&this.data.password=="123456")
// {
//    wx.showToast({
//     title: '登陆成功！',
//   })
//       wx.navigateTo({
//         url: '../searchnew/searchnew',
//       })
// }
//     else{
//             wx.showToast({
//               title: '账号或密码错误！',
//             })
//     }
    //测试结束
  },
  mmchange:function(){
    this.setData({showmmchange:true});  
  },
  onClose:function(){
    this.setData({showmmchange: false });
  },
  accountInput2: function (e){
    var content = e.detail.value;
    //console.log(content);
    if(content!=""){
      this.setData({disabled:false,btnstate:"primary",account2:content});
    }
    //console.log(this.account)
  },
  pwdBlur2: function (e) {
    var oldpassword = e.detail.value;
    //console.log(password);
    if(password!=""){
      this.setData({oldpassword:oldpassword});

    }
  },
  pwdBlur3:function(){
    var newpassword = e.detail.value;
    //console.log(password);
    if(password!=""){
      this.setData({newpassword:newpassword});
    }
  },
  confimed:function(){
    wx.cloud.callFunction({
      name:'setpass',
      data:{
        user:this.data.account2,
        pass:this.data.oldpassword,
        newpass:this.data.newpassword
      },
      success:(res)=>{
        wx.showToast({
          title: '修改成功！',
        })
      },
      fail:(res)=>{
       console.log(res);
      }
})  
  }
})