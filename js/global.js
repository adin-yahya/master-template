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
        }
    })
}
function openFullscreen () {
    var elem = document.documentElement
    if (elem.requestFullscreen) {
        elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen()
    }
}
export default function (refresh = false) {
    feather.replace()
    $(document).ready(function () {
        setTimeout((e) => {
            $(".preloader").hide()
        }, 2000)
    })
    if (refresh) {
        window.scrollTo(0, 0)
        AOS.init()
        swiperInit()
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                })
            })
        })
        $(window).scroll(function () {
            if ($(this).scrollTop() < $('section[data-anchor="hero-section"]').offset().top) {
                $('nav div a').removeClass('active')
            }
            if ($(this).scrollTop() + 100 >= $('section[data-anchor="hero-section"]').offset().top) {
                $('nav div a').removeClass('active')
                $('nav div a:eq(0)').addClass('active')
            }
            if ($(this).scrollTop() + 100 >= $('section[data-anchor="profile-section"]').offset().top) {
                $('nav div a').removeClass('active')
                $('nav div a:eq(1)').addClass('active')
            }
            if ($(this).scrollTop() + 100 >= $('section[data-anchor="event-section"]').offset().top) {
                $('nav div a').removeClass('active')
                $('nav div a:eq(2)').addClass('active')
            }
            if ($(this).scrollTop() + 100 >= $('section[data-anchor="maps-section"]').offset().top) {
                $('nav div a').removeClass('active')
                $('nav div a:eq(3)').addClass('active')
            }
            if ($(this).scrollTop() + 100 >= $('section[data-anchor="story-section"]').offset().top) {
                $('nav div a').removeClass('active')
                $('nav div a:eq(4)').addClass('active')
            }
            if ($(this).scrollTop() + 100 >= $('section[data-anchor="gallery-section"]').offset().top) {
                $('nav div a').removeClass('active')
                $('nav div a:eq(5)').addClass('active')
            }
            if ($(this).scrollTop() + 100 >= $('section[data-anchor="guestbook-section"]').offset().top) {
                $('nav div a').removeClass('active')
                $('nav div a:eq(6)').addClass('active')
            }
        })
    }
}