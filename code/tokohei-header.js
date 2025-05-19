//header-fix
'use strict'

window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    // PC版のヘッダー表示制御
    const pcheader = document.getElementById('pc-header');
    const top = document.getElementById('top');
    if (top && pcheader) {
        const topBottom = top.offsetTop + top.offsetHeight;
        if (scrollY >= topBottom) {
            pcheader.classList.add('fixed');
        } else {
            pcheader.classList.remove('fixed');
        }
    }

    // モバイル版のヘッダー表示制御
    const mbheader = document.getElementById('mb-header');
    const topMb = document.getElementById('top-mb');
    if (topMb && mbheader) {
        const topMbBottom = topMb.offsetTop + topMb.offsetHeight;
        if (scrollY >= topMbBottom) {
            mbheader.classList.add('fixed-mb');
            mbheader.style.opacity = '1'; // 表示する
        } else {
            mbheader.classList.remove('fixed-mb');
            mbheader.style.opacity = '0'; // 非表示に戻す
        }
    }
});

//hanburger
$(function () {
  $('#js-hamburger-menu, .navigation__link').on('click', function () {
    $('.navigation').slideToggle(500)
    $('.hamburger-menu').toggleClass('hamburger-menu--open')
  });
});