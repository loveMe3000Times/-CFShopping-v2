require(['./config'], () => {
    require(['header','goods'],(header, Goods) => {
        var option = { // 请求参数
            container: "#goodsShow",
            url: "http://rap2api.taobao.org/app/mock/233790/productlist",
            data:{
            num:4,
            classify: "all"
            }
        }
        var goods = new Goods.Goods();
        goods.loadGoods(option);
    })
});