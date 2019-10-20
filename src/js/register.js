require(['./config'], (config) => {
    require([], () => {
        class Register {
            constructor() {
                console.log(1)
            }
        }

        bannerControl(){
            $('#banner').carousel({
                interval: 0
            })
        }

        return new Register();
    })
})