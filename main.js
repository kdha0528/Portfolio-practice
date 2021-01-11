'use strict';

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar__dark');
    } else {
        navbar.classList.remove('navbar__dark');
    }
});

// Handle scrolling when tapping on the navbar menu.
const navbarMenu = document.querySelector('#navbar');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link);
});

//Make home slowlu fade to transparent as the window scrolls down.
scrollingFadeIn('#home');
scrollingFadeIn('#about');
scrollingFadeIn('#skills');
scrollingFadeIn('#projects');

//dhow "arrow up" button when scrolling down
const arrow = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        arrow.classList.add('arrow-up__visible');
    } else {
        arrow.classList.remove('arrow-up__visible');
    }
});

//Handle click on the "arrow up" button
arrow.addEventListener('click', () => {
    scrollIntoView('#home');
});

function scrollingFadeIn(id) {
    const selector = document.querySelector(id);
    const selectorHeight = selector.getBoundingClientRect().height;
    const position = selector.getBoundingClientRect().top;
    console.log(position);
    document.addEventListener('scroll', () => {
        console.log(window.scrollY);
        console.log(position);
        if (window.scrollY - position <= selectorHeight) {
            selector.style.opacity = 1.1 - (window.scrollY - position) / selectorHeight;
        } else {
            selector.style.opacity = 0;
        }
    });
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}
