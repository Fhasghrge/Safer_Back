// pages/search/search.js
var i = 0;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    visble: true,
    name: "",
    snumber: "",
    age: "",
    xueyuan: "",
    idistrue: 0,
    xcistrue: 0,
    jkma: 0,
    ishealth: 0,
    issp: 0,
    isbb: 0,
    pass_ident: "false",
    pass_route: "false",
    pass_form: "false",
    pass_report: "false",
    pass_dorm: "false"
  },
  onSearch: function (e) {
    //接入后端搜索功能
    wx.cloud.callFunction({
      name: 'search',
      data: {
        num: e.detail
      },
      success: (res) => {
        console.log(res)
        this.setData({
          name: res.result.info[0].name,
          snumber: res.result.info[0].num,
          xueyuan: res.result.info[0].department,
          idistrue: res.result.view[0].ident,
          xcistrue: res.result.view[0].route,
          jkma: res.result.view[0].healcode,
          ishealth: res.result.view[0].heal,
          issp: res.result.view[0].form,
          isbb: res.result.view[0].report,
          visble: false
        });

      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg
        })
      }
    })

    //结束接入

    //测试代码
    // var sname=e.detail;
    // console.log(sname)
    //  this.setData({
    //    name:sname,
    //    visble:false
    //  })
    //测试结束
  },


  onChange: function () {
    if (i % 2) {
      this.setData({
        checked1: false
      })
    }
    else {
      this.setData({
        checked1: true
      })
      wx.showToast({
        title: '审批完成',
      })
      //在此处调用后台更新学生的审批情况


      //调用结束
    }
    i++;
    wx.cloud.callFunction({
      name: 'overview',
      data: {
        pass_ident: this.data.checked1,
      },
      success: (res) => {
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  onChange1: function () {
    if (i % 2) {
      this.setData({
        checked2: false
      })
    }
    else {
      this.setData({
        checked2: true
      })
      wx.showToast({
        title: '审批完成',
      })
      //在此处调用后台更新学生的审批情况


      //调用结束
    }
    i++;
    wx.cloud.callFunction({
      name: 'overview',
      data: {
        pass_route: this.data.checked2,
      },
      success: (res) => {
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  onChange2: function () {
    if (i % 2) {
      this.setData({
        checked3: false
      })
    }
    else {
      this.setData({
        checked3: true
      })
      wx.showToast({
        title: '审批完成',
      })
      //在此处调用后台更新学生的审批情况


      //调用结束
    }
    i++;
    wx.cloud.callFunction({
      name: 'overview',
      data: {
        pass_form: this.data.checked3,
      },
      success: (res) => {
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  onChange3: function () {
    if (i % 2) {
      this.setData({
        checked4: false
      })
    }
    else {
      this.setData({
        checked4: true
      })
      wx.showToast({
        title: '审批完成',
      })
      //在此处调用后台更新学生的审批情况


      //调用结束
    }
    i++;
    wx.cloud.callFunction({
      name: 'overview',
      data: {
        pass_report: this.data.checked4,
      },
      success: (res) => {
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  onChange4: function () {
    if (i % 2) {
      this.setData({
        checked5: false
      })
    }
    else {
      this.setData({
        checked5: true
      })
      wx.showToast({
        title: '审批完成',
      })

    }
    i++;
    //在此处调用后台更新学生的审批情况
    wx.cloud.callFunction({
      name: 'overview',
      data: {
        pass_dorm: this.data.checked5,
      },
      success: (res) => {
      },
      fail: (res) => {
        console.log(res);
      }
    })
    //调用结束
  }
})