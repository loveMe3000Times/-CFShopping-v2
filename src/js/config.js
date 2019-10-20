require.config({
    baseUrl: "/",
    paths: {
        "jquery": "libs/jquery/jquery-3.4.1.min",
        "header": "js/modules/header",
        "template": "libs/art-template/template-web",
        "jqueryCookie": "libs/jquery-plugins/jquery.cookie",
        "goods": "js/modules/goods",
        "imgZoom": "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "bootStrap": "libs/bootstrap-3.7/js/bootstrap.min"
    },
    // 垫片: 垫片项目的运行，需要在其他包的基础上
    shim: {
        'jqueryCookie': {
            deps: ['jquery']
        },
        "imgZoom": {
            deps: ['jquery']
        },
        "bootStrap":{
            deps:['jquery']
        }
    }
});
