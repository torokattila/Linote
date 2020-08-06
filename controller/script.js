window.onscroll = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
            $('.logout-button').fadeOut();
        } else {
            $('.logout-button').fadeIn();
        }
    }
}

$('.show-pw').on('touchstart mousedown', function () {
    $(this).prev().attr('type', 'text');
}).mouseup(function () {
    $(this).prev().attr('type', 'password');
}).mouseout(function () {
    $(this).prev().attr('type', 'password');
})

const colors = ['#fff740', '#ef820d', '#fda50f', '#cf9812a'];
const newColor = colors[Math.floor(Math.random() * colors.length)];

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

var noteContainer = document.querySelector(".notecontainer");

Sortable.create(noteContainer, {
    animation: 500
});
