/** 详情页逻辑代码
 * 
 * @function initAll()    初始化界面（包括：样式详情的渲染，放大镜的初始化）
 * @function setNum()     设置选购的数量,由加减按钮，控制input框中选购数量的变化
 * @function changeImg()   选取不同的展示图片(小)时，改变当前图片为正在展示状态（class="ac"）
 * @function changeLike()  改变"枪模"（like）或"款式"的选中样式 (class="ac")
 * @function addCart()     实现点击 "添加购物车" 按钮，实现添加购物车功能（将部分重要信息存储在本地LocalStorage）
 *******************************************************************************/

require(['./config'], (config) => {
    require(['header', 'imgZoom', 'template'], (header, imgZoom, template) => {
        class Detail {

            constructor() {
                this.id;

                this.initAll().then(() => {
                    this.setNum();      // 设置购买数量
                    this.changeImg();   // 小图片选中样式
                    this.changeLike();  // 改变枪模(like)的选中样式
                    this.addCart();     // 添加购物车
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
                    if (--num < 1) {
                        num = 1;
                    }
                    $numNode.val(num);
                })
            }

            /** 改变缩略图的选中样式
             ********************************/
            changeImg() {
                $("#small").on('click', () => {
                    console.log(this);
                });
            }

            /** 改变枪模（like）的选中样式
             **************************************/
            changeLike() {
                $("#like").on('click', 'a', function () {
                    $(this).siblings().removeClass("ac");
                    $(this).addClass("ac");
                });
            }

            /** 添加购物车
             *********************************/
            addCart() {
                $("#addCart").on('click', () => {
                    var list = JSON.parse(localStorage.getItem("cart"));
                    var id = window.location.search.slice(4);

                    // 添加localStorage数据
                    if (list) {
                        // 检验数据存在否(判断id是否存在)
                        var isExist = list.some((item, index) => {
                            return item.id === id
                        });

                        if (isExist) {// 数据已存在， 更新数量
                            for (let i = 0; i < list.length; i++) {
                                if (id === list[i].id) {
                                    var num = $("#num").val(); // 选购数量
                                    list[i].num = parseInt(list[i].num) + parseInt(num);
                                    list[i].total += parseFloat(list[i].num,2) + parseFloat(list[i].price,2);
                                    list[i].total = parseFloat(list[i].total,2);
                                    break;
                                }
                            }
                            localStorage.setItem("cart", JSON.stringify(list));

                        } else {   // 数据未存在， 添加新数据
                            var shop = {
                                id: id,
                                img: $("#small img").eq(0).attr("src"),
                                name: $(".shopName").html(),
                                desc: $(".desc").html(),
                                price: $(".salePrice").html(),
                                originPrice: $(".originPrice").html(),
                                gift: $(".gift").html(),
                                saleNum: $(".saleNum").html(),
                                appraiseNum: $(".appraiseNum").html(),
                                score: $(".score").text(),
                                like: $("#like").find("a[class='ac']").html(),
                                num: $("#num").val(),
                                total:  parseFloat(parseFloat( $("#num").val())*parseFloat($(".salePrice").html())).toFixed(2)
                                
                            }
                            list.push(shop);
                            localStorage.setItem("cart", JSON.stringify(list));
                        }

                    } else {   // 添加第一条数据
                        var shop = {
                            id: id,
                            img: $("#small img").eq(0).attr("src"),
                            name: $(".shopName").html(),
                            desc: $(".desc").html(),
                            price: $(".salePrice").html(),
                            originPrice: $(".originPrice").html(),
                            gift: $(".gift").html(),
                            saleNum: $(".saleNum").html(),
                            appraiseNum: $(".appraiseNum").html(),
                            score: $(".score").text(),
                            like: $("#like").find("a[class='ac']").html(),
                            num: $("#num").val(),
                            total:  parseFloat(parseFloat( $("#num").val())*parseFloat($(".salePrice").html())).toFixed(2);
                        }
                        list = [shop];
                        localStorage.setItem("cart", JSON.stringify(list));
                    }


                });
            }

        }

        return new Detail();

    });
});