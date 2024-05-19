const {
deleteData,
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

islike: false,

},
async    onLoad(option) {

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
tablename: 'zhibiaoshezhi',
userid:userInfo.id,
goodid: this.data.detailList.id,
buynumber:  this.data.activeSeat.length,
total: 0,
discounttotal: 0,
address: this.data.activeSeat,
status: '已支付',
discountprice: this.data.detailList.vipprice,
picture:  this.data.picture[0],
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
} = await detail("zhibiaoshezhi",id)
this.setData({
payAuth:utils.isAuthFront('zhibiaoshezhi','支付')
})





this.setData({
goodname:data.kechengmingcheng
})
































const predetailList = Object.assign({}, data)
this.setData({
predetailList
})


const detailList = data
this.setData({
detailList,
picture: detailList.tupian.split(','),
})

if (!this.data.token) {
return
}


await this.searchList("isStoreup")
}

},

onUnload: function () {
getApp().globalData.detailList = {}
console.log('页面被卸载，执行销毁操作');
},
async listAdd(anyType) {
const userid = getApp().globalData.userInfo.id
const data = {
            name: this.data.detailList.kechengmingcheng,
        picture:  this.data.detailList.tupian,
tablename: `zhibiaoshezhi`,
// type 收藏是1 关注是41
refid:getApp().globalData.detailId,
userid,
type: anyType
}
await add("storeup", data)
},
async searchList(name) {
const userid = getApp().globalData.userInfo.id
const searchData = {
page: 1,
limit: 1,
refid:getApp().globalData.detailId,
tablename: "zhibiaoshezhi",
userid,
// 1收藏 %2%点赞
type: 1
}
if (name == "isStoreup" ) {
const storeupRes = await list("storeup", searchData)
if (storeupRes?.data?.list?.length > 0) {
    // 收藏
    this.setData({
        islike: true
    })
    const id = [storeupRes?.data?.list[0]?.id]
    return id
}
else {
    this.setData({
        islike: false
    })
}
}
},
likeTap() {

if (!this.data.token) {
return
}
wx.showModal({
title: '提示',
content: '是否收藏',
complete: async (res) => {
if (res.confirm) {
    // 添加收藏
    await this.listAdd(1)
    await this.listUpdate('islike')
    await this.searchList("isStoreup")
}
}
})

},
cancelLikeTap() {

if (!this.data.token) {
return
}
wx.showModal({
title: '提示',
content: '是否取消收藏',
complete: async (res) => {
if (res.cancel) {}
if (res.confirm) {
    const id = await this.searchList("isStoreup")
    // 删除收藏
    await deleteData('storeup', id)
    await this.listUpdate('cancelislike')
    this.searchList("isStoreup")
}
}
})

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
const resUpdate = await update('zhibiaoshezhi', predetailList)
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
data["tupian"] = data.tupian
data['buynumber']=1
wx.setStorageSync('payObject',data);
wx.setStorageSync('paytable','zhibiaoshezhi');

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
const res = await update("zhibiaoshezhi", detailList)
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

                                                                

})