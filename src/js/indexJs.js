require(['./config'], (config) => {
    require(['header', 'template', 'goods', 'bootStrap'], (header, template, Goods, bootStrap) => {

        class Index {
            constructor() {
                this.classify = ['第一类', '第二类', '第三类', '第四类']; // 商品类型

                this.loadShoppingTitle().then(() => {  //加载商品title
                    this.loadShoppingContent();  // 加载商品内容, 确定商品的排版。
                });
            }


            /** 加载商品模块的“主标题”， “副标题” 以及 “广告大图”
             *********************************************/
            loadShoppingTitle() {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: "http://rap2api.taobao.org/app/mock/233790/indexShoppingTitle",
                        type: "get",
                        success: function (data) {
                            if (data.code === 200) {
                                var list = data.body.list;
                                list.forEach((item, index) => {
                                    var id = "#shop" + (index + 1); // 商品区域 id
                                    var text = $(id).html();   //  商品区域内容
                                    text += template('shoppingTitle', { item }); // 由模板引擎构造商品数据

                                    $(id).html(text);
                                });
                                resolve();
                            }
                        }
                    });
                })
            }

            /** 加载商品模块，每一件商品的信息
             **********************************/
            loadShoppingContent() {
                var goods = new Goods.Goods();

                for (let i = 1; i < 5; i++) {
                    var count = 1;
                    var option = { // 请求参数
                        url: "http://rap2api.taobao.org/app/mock/233790/indexGoods",
                        data: {
                            num: 4,
                            classify: this.classify[i - 1]
                        }
                    }

                    goods.loadGoods(option)
                        .then(() => {
                            var containerId = "#shop" + count++;
                            $(containerId).html($(containerId).html() + goods.getDOMText());
                        });
                }

            }
        }

        return new Index();
    })
});