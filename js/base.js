var mySwiper = new Swiper('.swiper-container', {
    autoplay: true, //可选选项，自动滑动
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay: {
        delay: 1000,//1秒切换一次
    },
})