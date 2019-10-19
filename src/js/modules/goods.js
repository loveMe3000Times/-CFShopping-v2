
/** 用来进行商品数据的请求、排序、筛选操作(手动复制html代码)
 *  @param  container  {Stirng}          商品展示的容器盒子id(应该携带#)
 *  @param  url        {Stirng}          请求发送的路径
 *  @param  [data]     {Object}          请求条件：发送请求所需要携带的参数
 *  @return            {Object}          包含class Goods 的对象
 * 
 *  @function loadGoods()     请求数据，后续所有操作都应该在.then()的回调函数内执行
 *  @function getDOMText()    获取当前渲染的 DOM 文档的字符串
 ********************************************************************/

define(['jquery', 'template'], ($, template) => {
    class Goods {
        constructor(container, data, url) {
            this.container = $(container); // 容器
            this.data = data;            // 请求条件
            this.url = url;                // 请求路径
            this.domText = "";             // 由数据渲染组成的DOM文档 

            // 当实例化时，如果有container，就直接渲染，否则需要手动调用loadGoods()
            if(this.container.get(0)){
                this.loadGoods();
            }
        }


        /** 请求数据，加载货物
         *  @param  option    {Object}   请求需要的参数{[url],[data],[container]}
         *  @return {Promise}     后续所有操作都应该在.then()的回调函数内执行
         ******************************************************************/
        loadGoods(option = {}) {
            if(option.container) this.container = $(option.container);
            if(option.data) this.data = option.data;
            if(option.url) this.url = option.url;

            // 发送请求数据
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: this.url,
                    data: {
                        ...this.data
                    },
                    type: "get",
                    success: (data) => {
                        if (data.code === 200) {
                            var list = data.body.list;
                            var text = template("shoppingContent", { list });
                            if(this.container.get(0)){  // 当传入容器时才渲染DOM
                                this.container.html(text);
                            }
                            this.domText = text;  // 记录渲染DOM的文档
                            resolve();
                        }
                    }
                });
            });
        }

        /** 获取当前的 DOM 文档
         ************************************/
        getDOMText(){
            return this.domText;
        }
    }

    return { Goods };
});