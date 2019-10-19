require(['./config'], (config) => {
    require(['header','imgZoom'], (header,imgZoom) => {
        header.removeNotice();
        $('#zoom_demo').elevateZoom({
            gallery:'small',
            scrollZoom: true, //是否开启鼠标滚动
            cursor: "url(/images/img4.png)", //光标：十字 
            zoomWindowWidth:460,
            zoomWindowHeight: 430
        });
    });
});