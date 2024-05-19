
const dateUtils = require('../../utils/defautils')
const utils = require("../../utils/index.js")
const {
SendverificationCode,
register,
option,
    smscode,
follow
} = require('../../api/login.js')
const {
    levelOption,
    sheng,
} = require('../../api/index.js')
Page({
data: {
     jiaoshigonghao:'',
     mima:'',
     jiaoshixingming:'',
    touxiang:'',
    tempPathtouxiang:'../../static/upload.png',
     lianxidianhua:'',
xingbieList:"男,女".split(','),
xingbieIndex:0,

    registerContainerClass: "",

},

async onLoad() {









},
onUnload() {
},
async onShow() {






    this.setData({
            xingbieList:  "男,女".split(',')
    })



},







async  register(){
if (this.data.jiaoshigonghao == "") {
wx.showToast({
title: '请输入教师工号',
icon: "none"
})
return;
}
if (this.data.mima == "") {
wx.showToast({
title: '请输入密码',
icon: "none"
})
return;
}
if (this.data.mima2=="") {
wx.showToast({
title: '请输入确认密码',
icon: "none"
})
return;
}
if (this.data.mima !== this.data.mima2) {
wx.showToast({
title: '密码与确认密码不一致!!',
icon: "none"
})
return;
}








    const regex = new RegExp(wx.getStorageSync("baseURL"), "g");
  const resultObj={
        jiaoshigonghao:this.data.jiaoshigonghao,
        mima:this.data.mima,
        mima2:this.data.mima2,
        jiaoshixingming:this.data.jiaoshixingming,
        touxiang:this.data.touxiang.replace(regex, ""),
        lianxidianhua:this.data.lianxidianhua,
        xingbie: this.data.xingbieList?.length ? this.data.xingbieList[this.data.xingbieIndex] : "",
  }
    const name="jiaoshigonghao"
    const password="mima"
    const res = await register("jiaoshi", name, this.data[name],password , this.data[password], resultObj)
if (res.code == 0) {
wx.navigateTo({
url: '../login/login',
})
} else {
wx.showToast({
title: res.msg,
icon: "none"
})
}

}



});