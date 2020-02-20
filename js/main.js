let st = 0;
const ci = [0, 1, 2, 3];
const gs = 0.002;
const co = [
    [0, 0, 0],
    [8, 8, 8],
    [24, 5, 30],
    [44, 10, 52],
    [54, 22, 62],
    [48, 48, 48]
];

function updateGradient() {
    const c0_0 = co[ci[0]];
    const c0_1 = co[ci[1]];
    const c1_0 = co[ci[2]];
    const c1_1 = co[ci[3]];
    const is = 1 - st;
    const r1 = Math.round(is * c0_0[0] + st * c0_1[0]);
    const r2 = Math.round(is * c1_0[0] + st * c1_1[0]);
    const g1 = Math.round(is * c0_0[1] + st * c0_1[1]);
    const g2 = Math.round(is * c1_0[1] + st * c1_1[1]);
    const b1 = Math.round(is * c0_0[2] + st * c0_1[2]);
    const b2 = Math.round(is * c1_0[2] + st * c1_1[2]);
    const c1 = `rgb(${r1},${g1},${b1})`;
    const c2 = `rgb(${r2},${g2},${b2})`;

    $('#gradient').css({
        background: `-webkit-gradient(linear, left top, right top, from(${c1}), to(${c2}))`
    }).css({
        background: `-moz-linear-gradient(left, ${c1} 0%, ${c2} 100%)`
    });

    st += gs;

    if (st >= 1) {
        st %= 1;
        ci[0] = ci[1];
        ci[2] = ci[3];
        ci[1] = (ci[1] + Math.floor(1 + Math.random() * (co.length - 1))) % co.length;
        ci[3] = (ci[3] + Math.floor(1 + Math.random() * (co.length - 1))) % co.length;
    }
}

setInterval(updateGradient, 1);

(($) => {
    $('#menu-toggle').on('click', function (e) {
        const $menu = $('#menu');

        $menu.toggleClass('active');

        e.preventDefault();
    });

    $('.scroll').on('click', function (e) {
        const href = $(this).attr('href');

        $('body, html').animate({
            scrollTop: $(href).offset().top
        }, 500);

        e.preventDefault();
    });

    $('.video-link').magnificPopup({
        type: 'iframe'
    });

    $('.newsletter').on('submit', function (e) {
        const data = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: 'https://subs.sonymusicfans.com/submit/',
            dataType: 'json',
            data: data,
            success: function () {
                $('.newsletter').replaceWith('<span class="thanks">Thanks for signing up!</span>');
            },
            error: function (err) {
                console.log(err);
            }
        });

        e.preventDefault();
    });

    $.fn.isInViewport = function () {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('scroll resize', function () {
        const width = $(this).innerWidth();

        if (width > 991) {
            $('.animated').each(function (idx, ele) {
                const $ele = $(ele);

                if ($ele.isInViewport()) {
                    const animation = $(this).data('animation');

                    if (animation) {
                        $ele.css('visibility', 'visible');
                        $ele.addClass(animation);
                    }
                }
            });
        }
    }).trigger('resize');
})(jQuery);
