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

    kechengbianhao:"",
    kechengmingcheng:"",
    kechenghao:"",
    xueqi:"",
    xuenian:"",
    zhuanye:"",
    shangkeshijian:"",
    kechengxingzhi:"",
    jiaoshigonghao:"",
    jiaoshixingming:"",
    shoukeshijian:"请选择时间",
showshoukeshijian:false,
        xueshengList:"${column.customize}".split(','),
        xueshengIndex:null,
    dachengdu1:"",
    dachengdu2:"",
    dachengdu3:"",
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
//人脸识别
const xueshengres = await option('xuesheng/xuehao')
        xueshengres.data.unshift('请选择学生')
this.setData({
        xueshengList: xueshengres.data
})


let  ro=this.data.ro
if(options?.cross){
var obj = wx.getStorageSync('crossObj');
let refobjempty
for (var o in obj){

    if(o=='kechengbianhao'){
    refobjempty["kechengbianhao"]=obj[o]
        ro.kechengbianhao = true;
        continue;
    }else{
    }


    if(o=='kechengmingcheng'){
    refobjempty["kechengmingcheng"]=obj[o]
        ro.kechengmingcheng = true;
        continue;
    }else{
    }


    if(o=='kechenghao'){
    refobjempty["kechenghao"]=obj[o]
        ro.kechenghao = true;
        continue;
    }else{
    }


    if(o=='xueqi'){
    refobjempty["xueqi"]=obj[o]
        ro.xueqi = true;
        continue;
    }else{
    }


    if(o=='xuenian'){
    refobjempty["xuenian"]=obj[o]
        ro.xuenian = true;
        continue;
    }else{
    }


    if(o=='zhuanye'){
    refobjempty["zhuanye"]=obj[o]
        ro.zhuanye = true;
        continue;
    }else{
    }


    if(o=='shangkeshijian'){
    refobjempty["shangkeshijian"]=obj[o]
        ro.shangkeshijian = true;
        continue;
    }else{
    }


    if(o=='kechengxingzhi'){
    refobjempty["kechengxingzhi"]=obj[o]
        ro.kechengxingzhi = true;
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


    if(o=='shoukeshijian'){
    refobjempty["shoukeshijian"]=obj[o]
        ro.shoukeshijian = true;
        continue;
    }else{
    }


    if(o=='xuesheng'){
    refobjempty["xuesheng"]=obj[o]
        ro.xuesheng = true;
        continue;
    }else{
    }


    if(o=='dachengdu1'){
    refobjempty["dachengdu1"]=obj[o]
        ro.dachengdu1 = true;
        continue;
    }else{
    }


    if(o=='dachengdu2'){
    refobjempty["dachengdu2"]=obj[o]
        ro.dachengdu2 = true;
        continue;
    }else{
    }


    if(o=='dachengdu3'){
    refobjempty["dachengdu3"]=obj[o]
        ro.dachengdu3 = true;
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
        xueshengres.data.map((item, index) => {
        if (item == data.xuesheng) {
            this.setData({
                    xueshengIndex: index,
                    xuesheng: item
            })
                                                                                                                                                                                                                                                                                                                                                                                                                                                        }else if (this.data.xueshengList.length == 1) {
            this.setData({
                    xueshengIndex: 0,
                    xuesheng: v
            })
        }
    })




const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
                kechengbianhao: data.kechengbianhao,
                    kechengmingcheng: data.kechengmingcheng,
                    kechenghao: data.kechenghao,
                    xueqi: data.xueqi,
                    xuenian: data.xuenian,
                    zhuanye: data.zhuanye,
                    shangkeshijian: data.shangkeshijian,
                    kechengxingzhi: data.kechengxingzhi,
                    jiaoshigonghao: data.jiaoshigonghao,
                    jiaoshixingming: data.jiaoshixingming,
                    shoukeshijian:utils.getCurrentDate("yMDhms"),
                            dachengdu1: data.dachengdu1,
                    dachengdu2: data.dachengdu2,
                    dachengdu3: data.dachengdu3,
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
    let zhuanye= getApp().globalData.userInfo.zhuanye
    ro.zhuanye=true
    this.setData({
            zhuanye,
    })
    sessionReadArr.push('zhuanye')

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











this.setData({
        shoukeshijian:utils.getCurrentDate("yMDhms")
})





},





























































































onshoukeshijianTap(){
this.setData({
    showshoukeshijian: true,
})

},
shoukeshijianTap(e) {
this.setData({
    shoukeshijian: e.detail.data
})

let c = this.data;
let h = this.data;


},








async xueshengChange(e) {
const selectedIndex = e.detail.value;
let  xuesheng=this.data.xueshengList[selectedIndex]
this.setData({
        xueshengIndex: selectedIndex,
        xuesheng
});
},






























async submit() {
let that = this
var query = wx.createSelectorQuery();











if(this.data.shoukeshijian?.includes("请选择") || this.data.shoukeshijian==""){
wx.showToast({
    icon: "none",
    title: `授课时间不能为空`,
})
return
}











const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
    kechengbianhao: this.data. kechengbianhao,
    kechengmingcheng: this.data. kechengmingcheng,
    kechenghao: this.data. kechenghao,
    xueqi: this.data. xueqi,
    xuenian: this.data. xuenian,
    zhuanye: this.data. zhuanye,
    shangkeshijian: this.data. shangkeshijian,
    kechengxingzhi: this.data. kechengxingzhi,
    jiaoshigonghao: this.data. jiaoshigonghao,
    jiaoshixingming: this.data. jiaoshixingming,
    shoukeshijian: this.data. shoukeshijian,
    xuesheng: this.data. xuesheng,
    dachengdu1: this.data. dachengdu1,
    dachengdu2: this.data. dachengdu2,
    dachengdu3: this.data. dachengdu3,
}
const detailId= getApp().globalData.detailId
const tableName= `shoukexinxi`

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









































































































if(this.data.xueshengList[this.data.xueshengIndex]==undefined ){
wx.showToast({
    icon: "none",
    title: `学生不能为空`,
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
let corssRes = await list(`shoukexinxi`, params)
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
await update(`shoukexinxi`, ruleForm)
}
else {
await add(`shoukexinxi`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`shoukexinxi`, ruleForm)
}
else {
await add(`shoukexinxi`, ruleForm)
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