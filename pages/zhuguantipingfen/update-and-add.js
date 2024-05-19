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

    shijuanmingcheng:"",
    fengmian:"",
    pingfen:"",
    jiaoshigonghao:"",
    jiaoshixingming:"",
        zhishidian1List:"${column.customize}".split(','),
        zhishidian1Index:null,
    dabiaodu1:"",
        zhishidian2List:"${column.customize}".split(','),
        zhishidian2Index:null,
    dabiaodu2:"",
        zhishidian3List:"${column.customize}".split(','),
        zhishidian3Index:null,
    dabiaodu3:"",
    xuehao:"",
    xueshengxingming:"",
timujianshu:"",
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

const zhishidian1res = await option('zhishidian/zhishidian')
        zhishidian1res.data.unshift('请选择知识点1')
this.setData({
        zhishidian1List: zhishidian1res.data
})
const zhishidian2res = await option('zhishidian/zhishidian')
        zhishidian2res.data.unshift('请选择知识点2')
this.setData({
        zhishidian2List: zhishidian2res.data
})
const zhishidian3res = await option('zhishidian/zhishidian')
        zhishidian3res.data.unshift('请选择知识点3')
this.setData({
        zhishidian3List: zhishidian3res.data
})


let  ro=this.data.ro
if(options?.cross){
var obj = wx.getStorageSync('crossObj');
let refobjempty
for (var o in obj){

    if(o=='shijuanmingcheng'){
    refobjempty["shijuanmingcheng"]=obj[o]
        ro.shijuanmingcheng = true;
        continue;
    }else{
    }


    if(o=='fengmian'){
refobjempty['fengmianPath']=baseURL+ obj[o].split(",")[0]
        ro.fengmian = true;
        continue;
    }else{
    }


    if(o=='timujianshu'){
    refobjempty["timujianshu"]=obj[o]
        ro.timujianshu = true;
        continue;
    }else{
    }


    if(o=='pingfen'){
    refobjempty["pingfen"]=obj[o]
        ro.pingfen = true;
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


    if(o=='zhishidian1'){
    refobjempty["zhishidian1"]=obj[o]
        ro.zhishidian1 = true;
        continue;
    }else{
    }


    if(o=='dabiaodu1'){
    refobjempty["dabiaodu1"]=obj[o]
        ro.dabiaodu1 = true;
        continue;
    }else{
    }


    if(o=='zhishidian2'){
    refobjempty["zhishidian2"]=obj[o]
        ro.zhishidian2 = true;
        continue;
    }else{
    }


    if(o=='dabiaodu2'){
    refobjempty["dabiaodu2"]=obj[o]
        ro.dabiaodu2 = true;
        continue;
    }else{
    }


    if(o=='zhishidian3'){
    refobjempty["zhishidian3"]=obj[o]
        ro.zhishidian3 = true;
        continue;
    }else{
    }


    if(o=='dabiaodu3'){
    refobjempty["dabiaodu3"]=obj[o]
        ro.dabiaodu3 = true;
        continue;
    }else{
    }


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
        zhishidian1res.data.map((item, index) => {
        if (item == data.zhishidian1) {
            this.setData({
                    zhishidian1Index: index,
                    zhishidian1: item
            })
                                                                                                                                                                                                                                                                                                                                                                                                                            }else if (this.data.zhishidian1List.length == 1) {
            this.setData({
                    zhishidian1Index: 0,
                    zhishidian1: v
            })
        }
    })


        zhishidian2res.data.map((item, index) => {
        if (item == data.zhishidian2) {
            this.setData({
                    zhishidian2Index: index,
                    zhishidian2: item
            })
                                                                                                                                                                                                                                                                                                                                                                                                                            }else if (this.data.zhishidian2List.length == 1) {
            this.setData({
                    zhishidian2Index: 0,
                    zhishidian2: v
            })
        }
    })


        zhishidian3res.data.map((item, index) => {
        if (item == data.zhishidian3) {
            this.setData({
                    zhishidian3Index: index,
                    zhishidian3: item
            })
                                                                                                                                                                                                                                                                                                                                                                                                                            }else if (this.data.zhishidian3List.length == 1) {
            this.setData({
                    zhishidian3Index: 0,
                    zhishidian3: v
            })
        }
    })




const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
                shijuanmingcheng: data.shijuanmingcheng,
                    fengmian:data?.fengmian?.split(',')[0],
            fengmianPath:baseURL+data?.fengmian?.split(',')[0],
                    timujianshu: data.timujianshu,
                    pingfen: data.pingfen,
                    jiaoshigonghao: data.jiaoshigonghao,
                    jiaoshixingming: data.jiaoshixingming,
                            dabiaodu1: data.dabiaodu1,
                            dabiaodu2: data.dabiaodu2,
                            dabiaodu3: data.dabiaodu3,
                    xuehao: data.xuehao,
                    xueshengxingming: data.xueshengxingming,
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





















uploadfengmian() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
    const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
    this.setData({
            fengmianPath: tempFilePaths[0]
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
                        fengmian: 'file/' + result.file
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








timujianshuInput(e) {
this.setData({
        timujianshu: e.detail.value // 每次输入变化时更新文本框的值
});
},

































async zhishidian1Change(e) {
const selectedIndex = e.detail.value;
let  zhishidian1=this.data.zhishidian1List[selectedIndex]
this.setData({
        zhishidian1Index: selectedIndex,
        zhishidian1
});
},
















async zhishidian2Change(e) {
const selectedIndex = e.detail.value;
let  zhishidian2=this.data.zhishidian2List[selectedIndex]
this.setData({
        zhishidian2Index: selectedIndex,
        zhishidian2
});
},
















async zhishidian3Change(e) {
const selectedIndex = e.detail.value;
let  zhishidian3=this.data.zhishidian3List[selectedIndex]
this.setData({
        zhishidian3Index: selectedIndex,
        zhishidian3
});
},






























async submit() {
let that = this
var query = wx.createSelectorQuery();
// 在 Page 中的某个方法中调用

query.select('#timujianshu').boundingClientRect();
query.exec(function (res) {
//res就是 所有标签为v1的元素的信息 的数组
that.setData({
        timujianshu: res[0].dataset.info
})
})





















const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
    shijuanmingcheng: this.data. shijuanmingcheng,
    fengmian:this.data.fengmian?.replace(regex, ""),
    pingfen: this.data. pingfen,
    jiaoshigonghao: this.data. jiaoshigonghao,
    jiaoshixingming: this.data. jiaoshixingming,
    zhishidian1: this.data. zhishidian1,
    dabiaodu1: this.data. dabiaodu1,
    zhishidian2: this.data. zhishidian2,
    dabiaodu2: this.data. dabiaodu2,
    zhishidian3: this.data. zhishidian3,
    dabiaodu3: this.data. dabiaodu3,
    xuehao: this.data. xuehao,
    xueshengxingming: this.data. xueshengxingming,
    timujianshu:this.data. timujianshu,
}
const detailId= getApp().globalData.detailId
const tableName= `zhuguantipingfen`

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




























































if(this.data.zhishidian1List[this.data.zhishidian1Index]==undefined ){
wx.showToast({
    icon: "none",
    title: `知识点1不能为空`,
})
return
}


















if(this.data.zhishidian2List[this.data.zhishidian2Index]==undefined ){
wx.showToast({
    icon: "none",
    title: `知识点2不能为空`,
})
return
}


















if(this.data.zhishidian3List[this.data.zhishidian3Index]==undefined ){
wx.showToast({
    icon: "none",
    title: `知识点3不能为空`,
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
let corssRes = await list(`zhuguantipingfen`, params)
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
await update(`zhuguantipingfen`, ruleForm)
}
else {
await add(`zhuguantipingfen`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`zhuguantipingfen`, ruleForm)
}
else {
await add(`zhuguantipingfen`, ruleForm)
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


onShareAppMessage() {

}
})