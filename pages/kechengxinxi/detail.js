const {
update,
add,
page,
list,
detail,
save
} = require("../../api/index.js")
const utils = require("../../utils/index.js")
Page({
data: {
token:  '',
baseURL:'',
id: getApp().globalData.detailId,
userId:getApp().globalData.userInfo.id,
detailList: {},
payAuth:"",
picture:"",
priceVisible:false,
goodname:"",

shoukexinxiShow:'',

},
async    onLoad(option) {
this.setData({
    shoukexinxiShow: utils.isAuthFront('kechengxinxi','授课'),
})

 let myid=option?.id?option?.id:getApp().globalData.detailId.id
this.setData({
id: myid,
token:   wx.getStorageSync('token'),
baseURL:   wx.getStorageSync('baseURL') + '/'
})
this.handleUpdateData()
},

orderTap(){
if (this.data.activeSeat.length <= 0) {
wx.showToast({
title: '请选择需要预订的位置',
icon: 'none'
})
return
}
const userInfo=getApp().globalData.userInfo
const activeSeat = this.data.activeSeat.join(',') + ',' + this.data.detailList.selected
let data = {
orderid: this.createOrderId(),
tablename: 'kechengxinxi',
userid:userInfo.id,
goodid: this.data.detailList.id,
buynumber:  this.data.activeSeat.length,
total: 0,
discounttotal: 0,
address: this.data.activeSeat,
status: '已支付',
discountprice: this.data.detailList.vipprice,
}
if(this.data.detailList.price){
data['status'] = '未支付'
data['price'] = this.data.detailList.price
data['total'] = parseFloat(data['price'] * activeSeat.length).toFixed(2)
wx.showModal({
title: '提示',
content: '是否预订选中座位',
complete: async (res) => {
if (res.confirm) {
    wx.setStorageSync('orderGoods',[data])
        wx.navigateTo({
        url: "/pages/shop-orders/orders-confirm?type=1&seat=1"
    })
}
}
})
}

}
,
chapterClick() {
    const item = this.data.freeChapterList[0]
    if(!item){
        return;
    }
    let type=1
if (type == 2 && this.userVip!='是') {
    wx.showToast({
        title: 'vip章节，请购买会员后阅读!',
        icon:"none"
    })
return
}

},
authTap() {
    if (!this.data.token) {
        wx.showToast({
            title: '请先登陆',
            icon: 'none'
        })
        return
    }
},
async handleUpdateData() {
// 更新当前页面的数据
var that = this
const id = getApp().globalData.detailId
if (id) {
const {
data
} = await detail("kechengxinxi",id)
this.setData({
payAuth:utils.isAuthFront('kechengxinxi','支付')
})











































const detailList = data
this.setData({
detailList,
})

if (!this.data.token) {
return
}


}

},

onUnload: function () {
getApp().globalData.detailList = {}
console.log('页面被卸载，执行销毁操作');
},
async listUpdate(name) {
const predetailList = this.data.predetailList
const detailList = this.data.detailList
predetailList.shangpintupian = this.data.picture[0]
if (name == "thumbsupnum") {

predetailList.thumbsupnum = predetailList.thumbsupnum + 1
detailList.thumbsupnum = detailList.thumbsupnum + 1
}
if (name == "cancelthumb") {

predetailList.thumbsupnum = predetailList.thumbsupnum - 1
detailList.thumbsupnum = detailList.thumbsupnum - 1
}
if (name == "crazilynum") {
predetailList.crazilynum = predetailList.crazilynum + 1
detailList.crazilynum = detailList.crazilynum + 1
}
if (name == "cancelCrazily") {
predetailList.crazilynum = predetailList?.crazilynum - 1
detailList.crazilynum = detailList.crazilynum - 1
}
if (name == 'cancelislike') {
predetailList.storeupnum = predetailList.storeupnum - 1
detailList.storeupnum = detailList.storeupnum - 1

}
if (name == "islike") {
predetailList.storeupnum = predetailList.storeupnum + 1
detailList.storeupnum = detailList.storeupnum + 1
}
this.setData({
detailList
})
const resUpdate = await update('kechengxinxi', predetailList)
if (resUpdate.code == 0) {
this.setData({
predetailList,
"detailList.crazilynum": predetailList.crazilynum
})

}


},




onPayTap()  {

if (!this.data.token) {
return
}
const baseURL=  wx.getStorageSync('baseURL')
let data=this.data.detailList
data['buynumber']=1
wx.setStorageSync('payObject',data);
wx.setStorageSync('paytable','kechengxinxi');

    wx.navigateTo({
        url: "/pages/pay-confirm/pay-confirm?type=1"
    })
},


onSHTap() {
this.selectComponent('#bottomFrame').showFrame();
},
canlreply() {
this.selectComponent('#bottomFrame').hideFrame();
},
async reply() {
const detailList = this.data.detailList
const res = await update("kechengxinxi", detailList)
if (res.code == 0) {
setTimeout(function () {
wx.showToast({
title: '回复成功',
icon: "none"
})
}, 1000)

this.handleUpdateData()
}
this.selectComponent('#bottomFrame').hideFrame();
},


async onShow() {
},




    download(e) {
let url = e.currentTarget.dataset.url
url = wx.getStorageSync('baseURL') + '/' + url;
wx.downloadFile({
    url: url,
    success: (res) => {
        if (res.statusCode === 200) {
            wx.showToast({
                title: '下载成功',
                icon: "none"
            })

            const filePath = res.tempFilePath
            wx.openDocument({
                filePath: filePath,
                showMenu: true,
                success: function (res) {
                    console.log('打开文档成功')
                }
            })
            console.log('点击查看文件', filePath);
                                            }
    }
});
},
// 跨表
onAcrossTap(e){

// (tableName,crossOptAudit,statusColumnName,tips,statusColumnValue)
const info = e.currentTarget.dataset.info;
const crossOptAudit=info.split(",")[1].replace(/'/g, '')

const token = wx.getStorageSync("token")
if (!this.data.token) {
wx.showToast({
    title: '请登录后再操作',
    icon:"none"
})
return
}

let pagetableName = info.split(",")[0]
const statusColumnName = info.split(",")[2]
const tips = info.split(",")[3]
const statusColumnValue = info.split(",")[3]
wx.setStorageSync('crossTable','kechengxinxi');
wx.setStorageSync(`crossObj`, this.data.detailList);
wx.setStorageSync('statusColumnName', statusColumnName?.substring(1, statusColumnName?.length - 1))
wx.setStorageSync('tips', tips.substring(1, tips?.length - 1))
wx.setStorageSync('statusColumnValue', statusColumnValue?.substring(1, statusColumnValue?.length - 1))
if (statusColumnName != '' && !statusColumnName.startsWith("[")) {
var obj = this.data.detailList
for (var o in obj) {
    if (statusColumnName.includes(o) && statusColumnValue.includes(obj[o])) {
        wx.showToast({
            title: tips,
            icon: "none"
        })
        return
    }
}
}
getApp().globalData.detailId = this.data.detailList.id
getApp().globalData.detailList = this.data.detailList
wx.navigateTo({
url: `/pages/${pagetableName}/update-and-add?cross=true`,
})

},

                                                                

})