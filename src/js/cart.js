require(['./config'], (config) => {
    require(['header', 'template'], (header, template) => {
        class Cart{
            constructor(){
                this.initAll();
                this.setNum();
                this.shopTotal();
            }
            
            /** 依据localstorage数据渲染界面商品内容区
             *******************************************/
            initAll(){
                var list = JSON.parse(localStorage.getItem("cart")); // 本地购物车数据单

                var text = template("shopContent", {list});
                $("#supplierContent").html(text);
            }

            /** 增减购物数量
             ***********************************/
            setNum() {
                $(".numWarp .warp").on('click', 'div', function() {
                    var $this = $(this); // 点击对象
                    var $num = null; // 数量框
                    
                    if($this.hasClass("less")){ //减少
                        $num = $this.next("input");
                        var num = parseInt($num.val()) - 1;
                        if(num < 1){num = 1}
                        $num.val(num);
                    }else if($this.hasClass("more")){  // 添加
                        $num = $this.prev("input");
                        var num = parseInt($num.val()) + 1;
                        $num.val(num);
                    }
                });
            }

            /** 当数量发生改变时，改变该条商品的总价格
             *********************************************/
            shopTotal(){
                $(".numWarp .warp").on('click', changeTotal);
                $(".numWarp .warp input").on('change', changeTotal);

                // 改变总价
                function changeTotal() {
                    var id = $(this).parents(".goods").attr("index"); // 产品id
                    var num = $(this).find("input").val();     // 选购数量
                    var $total = $(this).parents(".goods").find(".total");
                    
                    // 改变值
                    var list = JSON.parse(localStorage.getItem("cart"));
                    list.forEach((item, index) => {
                        if(id === item.id){
                            var total =  parseFloat((parseFloat(num) * parseFloat(item.price))).toFixed(2);
                            item.num = num;
                            item.total = total;
                            $total.html(total);
                            localStorage.setItem("cart", JSON.stringify(list));
                            return true;
                        }
                    });
                }
            }
        }

        return new Cart();
    });
});