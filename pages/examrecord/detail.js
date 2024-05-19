// pages/forumCenter/forumCenter.js
const {
    list
} = require("../../api/index.js")

Page({
    data: {
        currPage: 1,
        totalPage: 1,
        pageSize: 10,
        showToTopButton: true,
        onPageScrollTop: 0, // 存储滚动距离的变量
        paperid: "",
        list: [],
    },
    onLoad(options) {
        let paperid = options.id

        if (paperid) {
            this.setData({
                paperid
            })
            // console.log('paperid', this.data.paperid);

        }
        this.getData()


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    async onShow() {

    },


    async onDetailTap(e) {
        const item = e.currentTarget.dataset.item;
        // wx.setStorageSync('parentId', id)
        // // 将数组转换为字符串
        wx.navigateTo({
            url: `/pages/examrecord/detail?id=${id}`,
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        /*上拉加载的回调: mescroll=currPage携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
        let currPage = this.data.currPage
        let totalPage = this.data.totalPage
        // 判断到是最后一页，则停止刷新
        if (currPage <= totalPage) {
            // 获取下一页数据
            this.setData({
                currPage: currPage + 1
            })
            console.log('获取下一页数据');
            this.getData()
        }
    },
    async getData() {
        let id = getApp().globalData.userInfo.id
        console.log(id);
        let prarams = {
            page: this.data.currPage,
            limit: this.data.pageSize,
            userid: id,

        }
        console.log('this.data.paperid', this.data.paperid);
        if (this.data.paperid) {
            prarams['prarams'] = this.data.paperid
        } else {
            prarams['myscore'] = 0
        }
        const res = await list('examrecord', prarams)
        const preGoodsListData = this.data.list
        const result = preGoodsListData.concat(res.data.list)
        // console.log('goodsListData', goodsListData);
        this.setData({
            list: result,
        })
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },


    // async upCallback() {

    onShareAppMessage() {

    }
})