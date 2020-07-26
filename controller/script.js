$(document).ready(function () {
    var colors = ['#fff740', '#ef820d', '#fda50f', '#cf9812a'];

    $('.note').each(function () {
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).css('background-color', newColor)
    });
});

window.onscroll = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
            $('.logout-button').fadeOut();
        } else {
            $('.logout-button').fadeIn();
        }
    }
}
