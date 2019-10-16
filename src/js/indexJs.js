require(['./config'], (config) => {
    require(['header', 'template'], (header, template) => {

        class Index {
            constructor() {
                this.loadShoppingTitle().then(() => {  //加载商品title
                    this.loadShoppingContent();  // 加载商品内容, 确定商品的排版。
                });   
            }
            /** 加载商品模块的“主标题”， “副标题” 以及 “广告大图”
             * 
             *********************************/
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
             * 
             *******************************/
            loadShoppingContent() {
                $.ajax({
                    url: "http://rap2api.taobao.org/app/mock/233790/indexGoods",
                    data: {
                        "shopClass": "shopClass", // 商品类型
                        "num": 16       // 需要加载的商品数量，但是实际一次返回了16条，只请求了一次（网卡）
                    },
                    type: "get",
                    success: function (data) {
                        console.log(data);
                        if (data.code === 200) {
                            var list = data.body.list;
                            var text = ""; 
                            list.forEach((item, index) => {
                                text += template('shoppingContent', { item }); // 由模板引擎构造商品数据
                                // 四条渲染一次
                                if((index+1) % 4 === 0){
                                    console.log((index+1) / 4);
                                    console.log(text);
                                    var id = "#shop" + (((index+1) / 4));  // 商品区域 id
                                    var htmlText = $(id).html() + text;         //  商品区域内容
                                    $(id).html(htmlText);
                                    text = "";
                                }
                            });
                        }
                    }
                });
            }
        }

        return new Index();
    })
});