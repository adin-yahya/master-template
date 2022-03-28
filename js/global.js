

function swiperInit () {
    new Swiper('.swiper-normal', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        grabCursor: true,
        lazy: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
}
export default function () {
    feather.replace()
    swiperInit()
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}