window.onscroll = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
            $('.logout-button').fadeOut();
        } else {
            $('.logout-button').fadeIn();
        }
    }
}

$(document).ready(function () {
    const colors = ['#fff740', '#ef820d', '#fda50f', '#f9812a'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    $('.new-note-div').css('background-color', newColor);
})

$('.show-pw').on('touchstart mousedown', function () {
    $(this).prev().attr('type', 'text');
}).mouseup(function () {
    $(this).prev().attr('type', 'password');
}).mouseout(function () {
    $(this).prev().attr('type', 'password');
})

$('.deleteForm').on('submit', function (event) {
    event.preventDefault(),
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this note?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'orange',
            cancelButtonColor: '#f0928c',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $(this).unbind('submit').submit();
            }
        });
});

$('.logoutForm').on('click', function (event) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to log out?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'orange',
        cancelButtonColor: '#f0928c',
        confirmButtonText: 'Yes, log out!'
    }).then((result) => {
        if (result.value) {
            $(this).unbind('submit').submit();
        }
    });
})

$('.editForm').on('submit', function (event) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to edit this note?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'orange',
        cancelButtonColor: '#f0928c',
        confirmButtonText: 'Yes, edit!'
    }).then((result) => {
        if (result.value) {
            $(this).unbind('submit').submit();
        }
    });
})

$('.deleteUserForm').on('submit', function (event) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete your account?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'orange',
        cancelButtonColor: '#f0928c',
        confirmButtonText: 'Yes, delete!'
    }).then((result) => {
        if (result.value) {
            $(this).unbind('submit').submit();
        }
    });
})

$(document).ready(function () {
    var degrees = 360;

    $('.info-button').click(function () {
        $('.informationtext').animate({
            width: 'toggle',
            opacity: 'toggle'
        })

        degrees += 360;

        $('.info-icon').css({
            'transform': 'rotate(' + degrees + 'deg)',
            '-ms-transform': 'rotate(' + degrees + 'deg)',
            '-moz-transform': 'rotate(' + degrees + 'deg)',
            '-webkit-transform': 'rotate(' + degrees + 'deg)',
            '-o-transform': 'rotate(' + degrees + 'deg)'
        });
    })
})

// var noteContainer = document.querySelector(".notecontainer");

// Sortable.create(noteContainer, {
//     animation: 500
// });