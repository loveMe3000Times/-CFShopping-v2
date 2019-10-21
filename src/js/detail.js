require(['./config'], (config) => {
    require(['header', 'imgZoom', 'template'], (header, imgZoom, template) => {
        class Detail {

            constructor() {
                this.initAll().then(() => {
                    this.setNum();      // 设置购买数量
                    this.changeImg();   // 小图片选中样式
                    this.changeLike();  // 改变枪模(like)的选中样式
                });
            }

            /** 初始化页面
             ***************************************/
            initAll() {
                var id = window.location.search.slice(4);
                return new Promise((resolve) => {
                    $.ajax({
                        url: "http://rap2api.taobao.org/app/mock/233790/detail",
                        type: "get",
                        data: { id },
                        success: function (data) {
                            // 渲染detail
                            data = data.body.list[0];
                            var text = template("detailScript", { data })
                            $("#detailContent").html(text);

                            // 初始化放大镜 
                            $('#zoom_demo').elevateZoom({
                                gallery: 'small',
                                scrollZoom: true, //是否开启鼠标滚动
                            });

                            resolve();
                        }
                    });
                });
            }

            /** 增减购物数量
             ***********************************/
            setNum() {
                var $numNode = $("#num");   // 数量节点
                var $lessNode = $("#less"); // 减号节点
                var $moreNode = $("#more"); // 加号节点

                // 增加
                $moreNode.on('click', (e) => {
                    var num = parseInt($numNode.val()); // 当前数量
                    $numNode.val(++num);
                });

                // 减少
                $lessNode.on('click', (e) => {
                    var num = parseInt($numNode.val()); // 当前数量
                    if(--num < 1){
                        num = 1;
                    }
                    $numNode.val(num);
                })
            }

            /** 改变缩略图的选中样式
             ********************************/
            changeImg(){
                $("#small").on('click', () => {
                    console.log(this);
                });
            }

            /** 改变枪模（like）的选中样式
             **************************************/
            changeLike(){
                $("#like").on('click', 'a', function() {
                    $(this).siblings().removeClass("ac");
                    $(this).addClass("ac");
                });
            }

        }

        return new Detail();

    });
});