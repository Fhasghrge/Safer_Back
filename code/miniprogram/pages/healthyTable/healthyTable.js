import areaList from '../../utils/area'// 导入省市区数据
Page({
  data: {
    show: false, // 显式选择省市区
    areaList,
    Area: '当前所在地',
    detailAdd: '请输入详细地址',
    Date: '获取当前时间',
    DateGet: false,
    healths: [
      {
        id: 0,
        checked:true,
        info: '本人健康情况'
      },
      {
        id: 1,
        checked:true,
        info: '两周内有湖北旅行史或居住史'
      },
      {
        id: 2,
        checked:true,
        info: '两周内接触湖北返乡人员'
      },
      {
        id: 3,
        checked:true,
        info: '接触疑似或确诊'
      },
      {
        id: 4,
        checked:true,
        info: '政府隔离'
      },
      {
        id: 5,
        checked:true,
        info: '医学隔离'
      },
      {
        id: 6,
        checked:true,
        info: '是否确诊'
      },
      {
        id: 7,
        checked:true,
        info: '是否在校'
      },
      {
        id: 8,
        checked:true,
        info: '家庭成员健康情况' 
      },
    ],
    more: ''

  },
  showPopup() { // 打开省市区选择
    this.setData({show: true})
    console.log('弹出')
  },
  onClose() { // 关闭省市区选择
    this.setData({show: false})
    console.log('关闭')
  },
  confirmLoct(event) { // 确定省市区
    console.log(event.detail.values.map(item => item.name))
    let selectedArea = event.detail.values.map(item => item.name).join(' ')
    this.setData({Area: selectedArea})
    this.setData({show: false})
  },
  onCancel() { // 取消选择省市区
    this.setData({show: false})
  },
  onChange(event) { // 开关改变
    const healthinfo = this.data.healths
    healthinfo[event.target.id].checked = !healthinfo[event.target.id].checked
    this.setData({healths: healthinfo})
  },
  inputAdd(event) { // 获取详细地址
    this.setData({detailAdd:event.detail})
  },
  inputMore(event) { // 获取备注
    this.setData({more: event.detail})
  },
  submit() {
    wx.cloud.callFunction({
      name: 'overview',
      data: {
        address: this.data.detailAdd + this.data.Area,
        isheal: this.data.healths[0].checked,
        tohb: this.data.healths[1].checked,
        touhb:this.data.healths[2].checked,
        toupat:this.data.healths[3].checked,
        gov:this.data.healths[4].checked,
        med: this.data.healths[5].checked,
        iscon: this.data.healths[6].checked,
        atsch: this.data.healths[7].checked,
        family: this.data.healths[8].checked,
        note: this.data.more,
      },
      success: (res) => {
        wx.cloud.callFunction({
          name: 'overview',
          data: {
            heal: 1
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
      },
      fail: err => {
        console.log(err)
      }
  })
  }
})