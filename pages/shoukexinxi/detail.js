import { debugPrint } from 'XrFrame/kanata/lib/index'
import * as echarts from '../../component/ec-canvas/echarts'
let chart = null
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

// ec:{
//   onInit: initChart
// }

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
tablename: 'shoukexinxi',
userid:userInfo.id,
goodid: this.data.detailList.id,
    goodname:  this.data.detailList.kechengmingcheng,
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

var that = this
const id = getApp().globalData.detailId
if (id) {
const {
data
} = await detail("shoukexinxi",id)
this.setData({
payAuth:utils.isAuthFront('shoukexinxi','支付')
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
const resUpdate = await update('shoukexinxi', predetailList)
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
wx.setStorageSync('paytable','shoukexinxi');

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
const res = await update("shoukexinxi", detailList)
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
// function initChart(canvas,width,height,dpr) {
//   chart = echarts.init(canvas,null,{
//     width:width,
//     height:height,
//     devicePixelRatio:dpr
//   })
//   canvas.setChart(chart)
//   let option = getOption
//   chart.setOption(option)
//   return chart
// }
// function getOption() {
//   return {
//     title: {
//       text: 'Basic Radar Chart'
//     },
//     legend: {
//       data: ['Allocated Budget', 'Actual Spending']
//     },
//     radar: {
//       // shape: 'circle',
//       indicator: [
//         { name: 'Sales', max: 6500 },
//         { name: 'Administration', max: 16000 },
//         { name: 'Information Technology', max: 30000 },
//         { name: 'Customer Support', max: 38000 },
//         { name: 'Development', max: 52000 },
//         { name: 'Marketing', max: 25000 }
//       ]
//     },
//     series: [
//       {
//         name: 'Budget vs spending',
//         type: 'radar',
//         data: [
//           {
//             value: [4200, 3000, 20000, 35000, 50000, 18000],
//             name: 'Allocated Budget'
//           },
//           {
//             value: [5000, 14000, 28000, 26000, 42000, 21000],
//             name: 'Actual Spending'
//           }
//         ]
//       }
//     ]
//   };
// }