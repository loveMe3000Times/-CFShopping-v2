require(['./config'], (config) => {
    require(['jquery'], ($) => {
        class Register {
            constructor() {
                console.log(1)
            }

            bannerControl(){
                $('#banner').carousel({
                    interval: 0
                })
            }
        }

        

        return new Register();
    })
})