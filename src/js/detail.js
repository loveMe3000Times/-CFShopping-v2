require(['./config'], (config) => {
    require(['header'], (header) => {
        header.removeNotice();
    });
});