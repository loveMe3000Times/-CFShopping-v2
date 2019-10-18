require.config({
    baseUrl: "/",
    paths: {
        "jquery": "libs/jquery/jquery-3.4.1.min",
        "header": "js/modules/header",
        "template": "libs/art-template/template-web",
        "jqueryCookie": "libs/jquery-plugins/jquery.cookie"
    },
    // 垫片: 垫片项目的运行，需要在其他包的基础上
    shim: {
        'jqueryCookie': {
            deps: ['jquery']
        }
    }
});
