// pages/exampaper/exam.js
const {
    info,
    exampaperlist,
    save,
    session
} = require("../../api/index.js")
const utils = require("../../utils/index.js")
const menuData = require('../../utils/menu.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        examList: [],
        num: 0,
        optionsCode: [],
        myanswer: "",
        info: {},
        error: false,
        correct: false,
        subShow: true,
        nextShow: false,
        reversetime: null,
        isdisabled: false,
        manyOptions: [],
        analysis: false,
        end: false,
        score: 0,
        userid:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {

        let token = wx.getStorageSync('token');
        if (token) {
            const menu = menuData.default.list();
            const name = wx.getStorageSync('role');
            menu.map(obj => {
                if (name == obj.roleName) {
                    let userinfo = session(obj.tableName);
                    this.setData({
                        userid: userinfo.data?.id
                    })
                }
            })
        }




        var that = this
        const id = options.id
        const res = await info("exampaper", id)
        if (res?.data?.addtime) {
            utils.countdown(res?.data?.addtime, function (text) {
                // console.log(text); // 输出倒计时文本
                that.setData({
                    reversetime: text
                })
            }, false, "hms");

        }
        const data = {
            page: 1,
            limit: 1000,
            sort: "sequence",
            paperid: id
        }
        const examListRes = await exampaperlist("examquestion", data)


        const examList = examListRes.data.list.map((v, index) => {
            // if(v.questionname){
            v.questionname = index + 1 + ". " + v.questionname
            // }
            v.options = JSON.parse(decodeURIComponent(v.options));
            return v
        })
        const optionsCode = examList[this.data.num].options.map(option => option.code);
        const manyOptions = optionsCode.map(v => {
            return {
                name: v,
                checked: false
            }
        })

        this.setData({
            info: res.data,
            examList,
            optionsCode,
            manyOptions
        })

    },
    async submit() {
        // 回答正确
        const questionCount = this.data.examList?.length
        const averageScore = 100 / questionCount;
        const index = this.data.num
        if (this.data.myanswer == "") {
            wx.showToast({
                title: '请输入答案',
                icon: "none"
            })
        }
        if (this.data.examList[index].answer == this.data.myanswer) {
            const score = this.data.score + averageScore
            this.setData({
                correct: true,
                error: false,
                score
            })
        } else {
            // 回答错误
            // const score = this.data.score
            this.setData({
                correct: false,
                error: true,
                // score

            })

        }
        const data = this.data.examList[index]
        data["options"] = JSON.stringify(data.options)
        data["myanswer"] = this.data.myanswer
        await save("examrecord", data)
        if (this.data.examList.length - 1 == this.data.num) {
            this.setData({
                subShow: true,
                nextShow: false,
                isdisabled: true
            })
        } else {
            this.setData({
                subShow: false,
                nextShow: true,
                isdisabled: true
            })
        }

        // 答题完 结束考试
        if (this.data.num == this.data.examList?.length - 1) {
            this.setData({
                end: true,
                subShow: false
            })
        }
    },

    analysisTap() {
        this.setData({
            analysis: true
        })
    },
    acceptChild(e) {
        // console.log("e", e.detail.data);
        e.detail.data?.length > 0 ? (e.detail.data.join(","), this.setData({
            myanswer: e.detail.data
        })) : ""
    },
    nextTap() {
        this.setData({
            subShow: true,
            nextShow: false,
            analysis: false,
            error: false,
            correct: false,
            myanswer: "",
            num: this.data.num + 1,
            isdisabled: false
        })

    },
    quitTap() {
        wx.navigateBack({
            detail: 1
        })
    },
    answerChange(e) {
        const myanswer = this.data.optionsCode[e.detail.value]

        this.setData({
            myanswer
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        utils.countdown("", "", true)
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