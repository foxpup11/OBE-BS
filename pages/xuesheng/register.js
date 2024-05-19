
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
     xuehao:'',
     mima:'',
     xueshengxingming:'',
    touxiang:'',
    tempPathtouxiang:'../../static/upload.png',
xingbieList:"男,女".split(','),
xingbieIndex:0,
     shoujihaoma:'',
     banji:'',

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




    const  banji = await option('banji/banji')
    this.setData({
            banjiList: banji.data
    })

},







xuehaoInput(e) {
this.setData({
    xuehao: e.detail.value
})
},

mimaInput(e) {
this.setData({
    mima: e.detail.value
})
},

xueshengxingmingInput(e) {
this.setData({
    xueshengxingming: e.detail.value
})
},


touxiangTap() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
let tempPathtouxiang= tempFilePaths[0]
// 本地临时图片的路径
this.setData({
    tempPathtouxiang,
})
// 上传网络图片
const  baseURL= wx.getStorageSync('baseURL')
    if(baseURL){
        wx.uploadFile({
            url: `${baseURL}/file/upload`,
            filePath: res.tempFilePaths[0],
            name: 'file',
            header: {
                'Token': wx.getStorageSync('token')
            },
            success: (uploadFileRes) => {
                let result = JSON.parse(uploadFileRes.data);
                // result.file是上传成功为网络图片的名称
                if (result.code == 0) {
                    this.setData({
                            touxiang: 'file/' + result.file
                    })
                } else {
                    wx.showToast({
                        title: result.msg,
                        icon: 'none',
                        duration: 2000
                    });
                }
            }
        })
    }



}
})
},

xingbieChange(e) {
const selectedIndex = e.detail.value;
    this.setData({
            xingbieIndex: selectedIndex,
    });
},

shoujihaomaInput(e) {
this.setData({
    shoujihaoma: e.detail.value
})
},

banjiChange(e) {
const selectedIndex = e.detail.value;
    this.setData({
            banjiIndex: selectedIndex,
    });
},

async  register(){
if (this.data.xuehao == "") {
wx.showToast({
title: '请输入学号',
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
        xuehao:this.data.xuehao,
        mima:this.data.mima,
        mima2:this.data.mima2,
        xueshengxingming:this.data.xueshengxingming,
        touxiang:this.data.touxiang.replace(regex, ""),
        xingbie: this.data.xingbieList?.length ? this.data.xingbieList[this.data.xingbieIndex] : "",
        shoujihaoma:this.data.shoujihaoma,
        banji: this.data.banjiList?.length ? this.data.banjiList[this.data.banjiIndex] : "",
  }
    const name="xuehao"
    const password="mima"
    const res = await register("xuesheng", name, this.data[name],password , this.data[password], resultObj)
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