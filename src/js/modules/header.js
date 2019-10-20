define(["jquery", "template", "bootStrap"], ($, template) => {
    /* - 功能： 用于加载header html代码，以及相关的js行为 - */
    class Header {
        constructor() {
            this.loadHtml().then(() => {
                this.loginControl();   // 登录框控制
                this.search();        // 搜索关联
                this.searchUlClick(); // 搜索提示框
                this.allShopControl();// 全部商品分类 按钮
            });
        }
        /** 加载header html 代码
         ************************************/
        loadHtml() {
            return new Promise((resolve, reject) => {
                $("header").load("/html/modules/header.html", resolve);
            });
        }

        /**  搜索框事件(baidu接口)
         *************************************/
        search() {
            $("#search").on('keyup', function () {
                // 过虑 空搜索
                if ($(this).val().trim() === "") {
                    $("#search + ul").css("display", "none");
                    return false;  
                }
                // 请求 数据
                $.ajax({
                    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + $(this).val(),
                    type: 'get',        // 请求方式 
                    dataType: 'jsonp',  // 预期的服务器响应的数据类型 —— 为jsonp
                    jsonp: "cb",        // 回调函数名
                    success: function (data) {
                        var list = data.s;
                        // artTemplate 模板引擎
                        var htmlText = template("searchTemp", { list });
                        $("#search + ul").css("display", "block").html(htmlText);
                    }
                });
            });
        }

        /** 搜索数据框（search搜索关联结果的选择）点击事件
         **************************************/
        searchUlClick() {
            $("#search + ul").on("mouseup", "li", function () {
                var text = this.innerHTML; // 选取项文字
                $("#search + ul").css({ display: "none" });
                $("#search").val(text);
            });
        }

        /** （全部商品分类按钮），移入出现，移出nav 消失
         *******************************************/
        allShopControl() {
            // 鼠标移入 全部商品分类
            $("header nav .right").on('mouseenter', () => {
                $("header .menu").css("display", "block");
                $("header nav .right span:nth-child(2)").css({"background-position":"-66px -0px"});
            });
            // 鼠标移出菜单栏
            $("header .menu").on('mouseleave', () => {
                $("header .menu").css("display", "none");
                $("header nav .right span:nth-child(2)").css({"background-position":" -100px -0px"});
            });
        }


        /** 登录框控制
         ********************************************************/
        loginControl(){
            // $('#loginModal').modal('show')
        }
    }

    return new Header();
});