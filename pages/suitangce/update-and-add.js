// pages/edit/edit.js
const {
detail,
option,
update,
add,
list,
follow,
faceMatch,
session,
rubbish,
baiduIdentify
} = require("../../api/index.js")

const des = require('../../utils/des.js')
const utils = require("../../utils/index.js")

Page({

/**
* 页面的初始数据
*/
data: {
imgIcon: "../../static/upload.png",
editStatus: false,
baseURL:'',
sessionReadArr:[],

detailList: null,
id: "",
cross:"",
ruleForm:{},
userid:getApp().globalData.userInfo.id,
userInfo:getApp().globalData.userInfo,
ro:{
},

        xuehaoIndex: null,
        xuehaoList: [],
    xueshengxingming:"",
    biaoti:"",
    neirong:"",
    jiaoshigonghao:"",
    jiaoshixingming:"",
},


/**
* 生命周期函数--监听页面加载
*/
async onLoad(options) {
let userid
if (options?.id) {
this.setData({
editStatus: true
})


}
if(!this.data.userid){
let nowTable = wx.getStorageSync("nowTable");
const res = await session(nowTable)
getApp().globalData.userInfo=res?.data
userid = res?.data.id
}
let baseURL =wx.getStorageSync('baseURL') + '/'
const id = getApp().globalData.detailId
this.setData({
userid,
refid:id,
baseURL
})

const xuehaores = await option('xuesheng/xuehao')
        xuehaores.data.unshift('请选择学号')
this.setData({
        xuehaoList: xuehaores.data
})


let  ro=this.data.ro
if(options?.cross){
var obj = wx.getStorageSync('crossObj');
let refobjempty
for (var o in obj){

    if(o=='xuehao'){
    refobjempty["xuehao"]=obj[o]
        ro.xuehao = true;
        continue;
    }else{
    }


    if(o=='xueshengxingming'){
    refobjempty["xueshengxingming"]=obj[o]
        ro.xueshengxingming = true;
        continue;
    }else{
    }


    if(o=='biaoti'){
    refobjempty["biaoti"]=obj[o]
        ro.biaoti = true;
        continue;
    }else{
    }


    if(o=='neirong'){
    refobjempty["neirong"]=obj[o]
        ro.neirong = true;
        continue;
    }else{
    }


    if(o=='jiaoshigonghao'){
    refobjempty["jiaoshigonghao"]=obj[o]
        ro.jiaoshigonghao = true;
        continue;
    }else{
    }


    if(o=='jiaoshixingming'){
    refobjempty["jiaoshixingming"]=obj[o]
        ro.jiaoshixingming = true;
        continue;
    }else{
    }


}
let  statusColumnName=wx.getStorageSync('statusColumnName');
statusColumnName=statusColumnName.replace('[',"").replace(']',"");
this.setData({
ro,
cross:options?.cross,
statusColumnName
})
    this.setData(...refobjempty)
}

if(id){
// 如果上一级页面传递了id，获取改id数据信息
const   data=getApp().globalData.detailList
        xuehaores.data.map((item, index) => {
        if (item == data.xuehao) {
            this.setData({
                    xuehaoIndex: index,
                    xuehao: item
            })
                                                                            this.getfollow("xuesheng","xuehao",item,"xueshengxingming")
                                                                                                                                                                                }else if (this.data.xuehaoList.length == 1) {
            this.setData({
                    xuehaoIndex: 0,
                    xuehao: v
            })
        }
    })




const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
                xuehao: data.xuehao,
                            biaoti: data.biaoti,
                    neirong: data.neirong,
                    jiaoshigonghao: data.jiaoshigonghao,
                    jiaoshixingming: data.jiaoshixingming,
                    shhf: data.shhf,
    }
this.setData(objtemp);

//ss读取
let h = this.data
let c = this.data
this.setData({
});

}else {
this.setData({
})
}



// ss读取
let sessionReadArr=[]
    let jiaoshigonghao= getApp().globalData.userInfo.jiaoshigonghao
    ro.jiaoshigonghao=true
    this.setData({
            jiaoshigonghao,
    })
    sessionReadArr.push('jiaoshigonghao')
    let jiaoshixingming= getApp().globalData.userInfo.jiaoshixingming
    ro.jiaoshixingming=true
    this.setData({
            jiaoshixingming,
    })
    sessionReadArr.push('jiaoshixingming')

this.setData({
cross:options?.cross,
ro,
id,
sessionReadArr

})



},

getUUID () {
return new Date().getTime();
},
onUnload: function () {
console.log('页面被卸载，执行销毁操作');
},
onShow() {







},













async getfollow(refTable, refColumn, refColumnValue, suiColumnName) {
    const {
        data
    } = await follow(`${refTable}/${refColumn}`, refColumnValue)
    let tempObj = {};
    tempObj[suiColumnName] = data[suiColumnName];
    this.setData(tempObj);
},

async xuehaoChange(e) {
const selectedIndex = e.detail.value;
let  xuehao=this.data.xuehaoList[selectedIndex]
this.setData({
        xuehaoIndex: selectedIndex,
        xuehao
});
const {
    data
} = await follow('xuesheng/xuehao', xuehao)
                if(data.xueshengxingming){
            this.setData({
                    xueshengxingming:data.xueshengxingming
            })
        }
                        
},
















































shhfInput(e) {
this.setData({
        shhf: e.detail.value // 每次输入变化时更新文本框的值
});
},







async submit() {
let that = this
var query = wx.createSelectorQuery();














const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
    xuehao: this.data. xuehao,
    xueshengxingming: this.data. xueshengxingming,
    biaoti: this.data. biaoti,
    neirong: this.data. neirong,
    jiaoshigonghao: this.data. jiaoshigonghao,
    jiaoshixingming: this.data. jiaoshixingming,
}
const detailId= getApp().globalData.detailId
const tableName= `suitangce`

//跨表计算判断
var obj2;
var  ruleForm=obj
obj2 = ruleForm
this.data.refid==""? ruleForm['refid']= getApp().globalData.detailId:""
ruleForm['userid']=getApp().globalData.userInfo.id
var userInfo=getApp().globalData.userInfo


const sessionReadArr=this.data.sessionReadArr
const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const mobilePattern = /^(?:\+?86)?1[3-9]\d{9}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const idPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dxX]$/;
const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;






if(this.data.xuehaoList[this.data.xuehaoIndex]==undefined ){
wx.showToast({
    icon: "none",
    title: `学号不能为空`,
})
return
}





























































//更新跨表属性
var crossuserid;
var crossrefid;
var crossoptnum;

if(this.data.cross) {
wx.setStorageSync('crossCleanType', true);
var statusColumnName = wx.getStorageSync('statusColumnName');
var statusColumnValue = wx.getStorageSync('statusColumnValue');
if (statusColumnName != '') {
obj2 = wx.getStorageSync('crossObj');
if (!statusColumnName.startsWith("[")) {
for (var o in obj2) {
    if (statusColumnName.includes(o)){
        obj2[o] = statusColumnValue;
    }

}
var table = wx.getStorageSync('crossTable');
                            await update(table, obj2)
} else {

crossuserid =getApp().globalData.userInfo.id
crossrefid =  this.data.id
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
}
}
}
this.data.cross ? (crossrefid = this.data.id, crossuserid =this.data.userid) : ""

if(crossrefid && crossuserid) {
ruleForm['crossuserid'] = this.data.userid
ruleForm['crossrefid'] =this.data.id

this.setData({
ruleForm
})
let params = {
page: 1,
limit: 10,
crossuserid: crossuserid,
crossrefid: crossrefid,
}
const tips = wx.getStorageSync('tips')
let corssRes = await list(`suitangce`, params)
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.match(/\d+/g);
if (corssRes.data.total >= parseInt(crossoptnum)) {
wx.showToast({
icon: "none",
title: tips,
})
wx.removeStorageSync('crossCleanType');
return ;
}
else {


//跨表计算








if (ruleForm.id ) {
await update(`suitangce`, ruleForm)
}
else {
await add(`suitangce`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`suitangce`, ruleForm)
}
else {
await add(`suitangce`, ruleForm)
}
}
getApp().globalData.editorContent=''
wx.showToast({
title: '提交成功',
icon: "none"
})
const preId = getApp().globalData.detailId

if(table){
let res = await detail(table, preId)
if(res.code==0){
getApp().globalData.detailList = res.data
}

}



wx.navigateBack({
delta: 1,
complete: () => {
// 触发事件通知，传递需要更新的数据
const pages = getCurrentPages();
if (pages.length >= 1) {
const prePage = pages[pages.length - 1];
prePage.onLoad(); //
}
}
})













},
onHide() {

},

/**
* 生命周期函数--监听页面卸载
*/
onUnload() {

},


/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh() {

},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom() {

},

/**
* 用户点击右上角分享
*/
onShareAppMessage() {

}
})