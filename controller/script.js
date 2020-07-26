$(document).ready(function() {
    var colors = ['#fff740', '#ef820d', '#fda50f', '#cf9812a'];

    $('.note').each(function() {
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).css('background-color', newColor)
    });
});