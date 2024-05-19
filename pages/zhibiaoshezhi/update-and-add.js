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

        kechengbianhaoIndex: null,
        kechengbianhaoList: [],
    kechengmingcheng:"",
    kechenghao:"",
    tupian:"",
    shijiankaohe:"",
    guochengkaohe:"",
    qimokaohe:"",
    beizhu:"",
    storeupnum: '0',
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

const kechengbianhaores = await option('kechengxinxi/kechengbianhao')
        kechengbianhaores.data.unshift('请选择课程编号')
this.setData({
        kechengbianhaoList: kechengbianhaores.data
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


    if(o=='tupian'){
refobjempty['tupianPath']=baseURL+ obj[o].split(",")[0]
        ro.tupian = true;
        continue;
    }else{
    }


    if(o=='shijiankaohe'){
    refobjempty["shijiankaohe"]=obj[o]
        ro.shijiankaohe = true;
        continue;
    }else{
    }


    if(o=='guochengkaohe'){
    refobjempty["guochengkaohe"]=obj[o]
        ro.guochengkaohe = true;
        continue;
    }else{
    }


    if(o=='qimokaohe'){
    refobjempty["qimokaohe"]=obj[o]
        ro.qimokaohe = true;
        continue;
    }else{
    }


    if(o=='beizhu'){
    refobjempty["beizhu"]=obj[o]
        ro.beizhu = true;
        continue;
    }else{
    }


    if(o=='storeupnum'){
    refobjempty["storeupnum"]=obj[o]
        ro.storeupnum = true;
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
        kechengbianhaores.data.map((item, index) => {
        if (item == data.kechengbianhao) {
            this.setData({
                    kechengbianhaoIndex: index,
                    kechengbianhao: item
            })
                                                                            this.getfollow("kechengxinxi","kechengbianhao",item,"kechengmingcheng")
                                                                this.getfollow("kechengxinxi","kechengbianhao",item,"kechenghao")
                                                                                                                                                                                                            }else if (this.data.kechengbianhaoList.length == 1) {
            this.setData({
                    kechengbianhaoIndex: 0,
                    kechengbianhao: v
            })
        }
    })




const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
                kechengbianhao: data.kechengbianhao,
                                    tupian:data?.tupian?.split(',')[0],
            tupianPath:baseURL+data?.tupian?.split(',')[0],
                    shijiankaohe: data.shijiankaohe,
                    guochengkaohe: data.guochengkaohe,
                    qimokaohe: data.qimokaohe,
                    beizhu: data.beizhu,
                    storeupnum: '0',

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

async kechengbianhaoChange(e) {
const selectedIndex = e.detail.value;
let  kechengbianhao=this.data.kechengbianhaoList[selectedIndex]
this.setData({
        kechengbianhaoIndex: selectedIndex,
        kechengbianhao
});
const {
    data
} = await follow('kechengxinxi/kechengbianhao', kechengbianhao)
                if(data.kechengmingcheng){
            this.setData({
                    kechengmingcheng:data.kechengmingcheng
            })
        }
                if(data.kechenghao){
            this.setData({
                    kechenghao:data.kechenghao
            })
        }
                            
},
























uploadtupian() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
    const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
    this.setData({
            tupianPath: tempFilePaths[0]
    })
    let _this = this;
// 上传网络图片
    const baseURL = wx.getStorageSync('baseURL')
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
                        tupian: 'file/' + result.file
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

    this.setData({
        face: tempFilePaths[0]
    });

}
})
},














































async submit() {
let that = this
var query = wx.createSelectorQuery();
















const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
    kechengbianhao: this.data. kechengbianhao,
    kechengmingcheng: this.data. kechengmingcheng,
    kechenghao: this.data. kechenghao,
    tupian:this.data.tupian?.replace(regex, ""),
    shijiankaohe: this.data. shijiankaohe,
    guochengkaohe: this.data. guochengkaohe,
    qimokaohe: this.data. qimokaohe,
    beizhu: this.data. beizhu,
    storeupnum: this.data. storeupnum,
}
const detailId= getApp().globalData.detailId
const tableName= `zhibiaoshezhi`

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






if(this.data.kechengbianhaoList[this.data.kechengbianhaoIndex]==undefined ){
wx.showToast({
    icon: "none",
    title: `课程编号不能为空`,
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
let corssRes = await list(`zhibiaoshezhi`, params)
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
await update(`zhibiaoshezhi`, ruleForm)
}
else {
await add(`zhibiaoshezhi`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`zhibiaoshezhi`, ruleForm)
}
else {
await add(`zhibiaoshezhi`, ruleForm)
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