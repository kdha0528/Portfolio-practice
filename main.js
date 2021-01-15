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

//Project image and button
const img = document.querySelectorAll('.project__img');
const right = document.querySelector('.project__rightBtn');
const left = document.querySelector('.project__leftBtn');
const first = 0;
var index = 0;
right.addEventListener('click', () => {
    if (index == 0) {
        img[first].classList.add('project__invisible');
    }
    if (index == img.length - 1) {
        removeProjectImg(img[index]);
        index = 0;
        img[first].classList.remove('project__invisible');
        addProjectImg(img[index]);
    } else {
        removeProjectImg(img[index]);
        index++;
        addProjectImg(img[index]);
    }
});
left.addEventListener('click', () => {
    if (index == 1) {
        img[first].classList.remove('project__invisible');
    }
    if (index == 0) {
        img[first].classList.add('project__invisible');
        removeProjectImg(img[index]);
        index = img.length - 1;
        addProjectImg(img[index]);
    } else {
        removeProjectImg(img[index]);
        index--;
        addProjectImg(img[index]);
    }
});

function addProjectImg(img) {
    img.classList.add('project__visible');
}

function removeProjectImg(img) {
    img.classList.remove('project__visible');
}

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
