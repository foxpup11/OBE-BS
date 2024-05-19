// app.js
App({
    onLaunch() {
        const tabarList=[]
        const genPages=[]
tabarList.push("exampaper")
    tabarList.push("zhibiaoshezhi")
    tabarList.push("zhuguanti")
        this.globalData.tabarList=tabarList
    },
    globalData: {
        name: null,
        goodsList: [],
        detailList: {},
        detailId: null,
        tabarList:[],
        userInfo:{},
        total:"",
        editorContent:''

    },

})